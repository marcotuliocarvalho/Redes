#include "socket.h"

void error(const char *msg)
{
    perror(msg);
    exit(1);
}

int create_client()
{
    struct sockaddr_in serv_addr;
    struct hostent *server;
    char buffer[256];
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) 
        error("ERROR opening socket");
    bzero((char *) &serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    if (connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) 
        error("ERROR connecting");
    return sockfd;
}

int * create_server()
{
	int opt = TRUE;
    int new_socket, server_fd;
    int *client_socket = (int*)malloc(sizeof(int)*4);
	int addrlen, activity, i , valread , sd;
	int max_sd;
    int count = 0;
	struct sockaddr_in address;
		
	fd_set readfds;
	
	for (i = 0; i < MAX_CLIENTS; i++)
		client_socket[i] = 0;
		
	if( (server_fd = socket(AF_INET , SOCK_STREAM , 0)) == 0)
	{
		perror("socket failed");
		exit(EXIT_FAILURE);
	}

	if( setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, (char *)&opt,
		sizeof(opt)) < 0 )
	{
		perror("setsockopt");
		exit(EXIT_FAILURE);
	}
	
	address.sin_family = AF_INET;
	address.sin_addr.s_addr = INADDR_ANY;
	address.sin_port = htons( PORT );
		
	if (bind(server_fd, (struct sockaddr *)&address, sizeof(address))<0)
	{
		perror("bind failed");
		exit(EXIT_FAILURE);
	}
	printf("Listener on port %d \n", PORT);
		
	if (listen(server_fd, 3) < 0)
	{
		perror("listen");
		exit(EXIT_FAILURE);
	}
		
	addrlen = sizeof(address);
		
	while(count < MAX_CLIENTS)
	{
		FD_ZERO(&readfds);
	
		FD_SET(server_fd, &readfds);
		max_sd = server_fd;
			
		for ( i = 0 ; i < MAX_CLIENTS ; i++)
		{
			sd = client_socket[i];
				
			if(sd > 0)
				FD_SET( sd , &readfds);
				
			if(sd > max_sd)
				max_sd = sd;
		}
	
		activity = select( max_sd + 1 , &readfds , NULL , NULL , NULL);
	
		if ((activity < 0) && (errno!=EINTR))
		{
			printf("select error");
		}
			
		if (FD_ISSET(server_fd, &readfds))
		{
			if ((new_socket = accept(server_fd,
					(struct sockaddr *)&address, (socklen_t*)&addrlen))<0)
			{
				perror("accept");
				exit(EXIT_FAILURE);
			}
		    client_socket[count++] = new_socket;
		    printf("Adding to list of sockets as %d\n" , count);
		}
	}
    return client_socket;
}