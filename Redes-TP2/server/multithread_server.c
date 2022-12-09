#include "multithread_server.h"

void * function(void *param)
{
    single_server(*(int*)param);
    free(param);
    pthread_exit(NULL);
}

void multithread_server(int newsocket)
{
    int *sock = (int*)malloc(sizeof(int));
    *sock = newsocket;
    pthread_t thread;
    pthread_create(&thread, NULL, function, sock);
}