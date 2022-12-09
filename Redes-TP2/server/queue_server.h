#include "multithread_server.h"
#include "queue.h"

void *queue_controler(void *param);
void queue_server(int sock);