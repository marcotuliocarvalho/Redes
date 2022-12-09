#include "queue.h"
Queue queue_sockets;

void start_queue()
{
    queue_sockets.begin = NULL;
    queue_sockets.end = NULL;
}

void enqueue(int sock)
{
    Node *node = (Node*)malloc(sizeof(Node));
    node->sock = sock;
    node->next = NULL;
    if(!queue_sockets.begin)
        queue_sockets.begin = node;
    else
        queue_sockets.end->next = node;
    queue_sockets.end = node;
}

int dequeue()
{
    Node *node = queue_sockets.begin;
    if(!node) return -1;
    queue_sockets.begin = node->next;
    int socket = node->sock;
    free(node);
    return socket;
}