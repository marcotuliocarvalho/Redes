#include "server/queue_server.h"
#include "server/select_server.h"

void* get_server(int option)
{
    switch(option)
    {
        case 1: printf("[!] Single Socket selected\n");return single_server;
        case 2: printf("[!] Multithread selected\n");return multithread_server;
        case 3: 
            printf("[!] Queue Multithread selected\n");
            pthread_t thread;
            pthread_create(&thread, NULL, queue_controler, NULL);
            return queue_server;
    }
}

int main(int argc, char *argv[])
{
    if(atoi(argv[2]) == 4)
    {
        printf("[!] Select Server selected\n");
        select_server(socket_fd(atoi(argv[1])));
    }
    else
        server(
            atoi(argv[1]),
            get_server(atoi(argv[2]))
        );
    return 0;
}