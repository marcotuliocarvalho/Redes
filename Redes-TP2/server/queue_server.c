#include "queue_server.h"
#define MAX_QUEUE 50

pthread_mutex_t lock;
int count = 0;

void decrement_count()
{
    pthread_mutex_lock(&lock);
    count--;
    pthread_mutex_unlock(&lock);
}

void increment_count()
{
    pthread_mutex_lock(&lock);
    count++;
    pthread_mutex_unlock(&lock);
}

int get_count()
{
    pthread_mutex_lock(&lock);
    int counter = count;
    pthread_mutex_unlock(&lock);
    return counter;
}

void * function_queue(void *param)
{
    increment_count();
    single_server(*(int*)param);
    free(param);
    decrement_count();
    pthread_exit(NULL);
}

void *queue_controler(void *param)
{
    start_queue();
    while(1)
    {
        int fd = dequeue();
        int counter = get_count();
        if(counter < MAX_QUEUE && fd > 0)
        {
            int *sock = (int*)malloc(sizeof(int));
            *sock = fd;
            pthread_t thread;
            pthread_create(&thread, NULL, function_queue, sock);
        }
    }
}

void queue_server(int sock)
{
    enqueue(sock);
}