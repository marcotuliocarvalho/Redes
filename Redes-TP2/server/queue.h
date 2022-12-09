#include <stdlib.h>

typedef struct Node
{
    int sock;
    struct Node * next;
}Node;

typedef struct
{   
    Node *begin;
    Node *end;
}Queue;

void start_queue();
void enqueue(int sock);
int dequeue();