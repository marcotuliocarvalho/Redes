#include "server.h"
#include "select_server.h"

void select_server(int newsocket)
{
    /* master file descriptor list */
    fd_set master;
    /* temp file descriptor list for select() */
    fd_set read_fds;
    /* client address */
    struct sockaddr_in clientaddr;
    /* clear the master and temp sets */
    FD_ZERO(&master);
    FD_ZERO(&read_fds);
    /* newly accept()ed socket descriptor */
    int newfd;
    /* add the listener to the master set */
    FD_SET(newsocket, &master);
    /* keep track of the biggest file descriptor */
    int fdmax = newsocket; /* so far, it's this one*/

    int addrlen;

    /* listen */
    if(listen(newsocket, 10) == -1)
    {
        perror("Server-listen() error lol!");
        exit(1);
    }

    for(;;)
    {

        int i;
        /* copy it */
        read_fds = master;

        if(select(fdmax+1, &read_fds, NULL, NULL, NULL) == -1)
        {
            perror("[-] AAServer-select() error lol!");
            exit(1);
        }

        /*run through the existing connections looking for data to be read*/
        for(i = 0; i <= fdmax; i++)
        {
            if(FD_ISSET(i, &read_fds))
            { /* we got one... */
                if(i == newsocket)
                {
                    /* handle new connections */
                    addrlen = sizeof(clientaddr);
                    if((newfd = accept(newsocket, (struct sockaddr *)&clientaddr, &addrlen)) == -1)
                    {
                        perror("[-] Server-accept() error lol!");
                    }
                    else
                    {
                        FD_SET(newfd, &master); /* add to master set */
                        if(newfd > fdmax)
                        { /* keep track of the maximum */
                            fdmax = newfd;
                        }                        
                    }
                }
                else
                {
                    /* we got some data from a client*/
                    int j;
                    for(j = 0; j <= fdmax; j++)
                    {
                        /* send to everyone! */
                        if(FD_ISSET(j, &master))
                        {
                            /* except the listener and ourselves */
                            if(j != newsocket)
                            {
                                GET get = read_http(j);
                                write_http(get,j);
                                /* close it... */
                                close(j);
                                /* remove from master set */
                                FD_CLR(j, &master);
                            }
                        }
                    }
                }
            }
        }
    }
}