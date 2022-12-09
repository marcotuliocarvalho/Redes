#include "socket.h"

typedef struct FileData
{
    char * data;
    char status[32];
    int content_length;
    char content_type[32];
}FileData;

typedef struct GET
{
    char file[1024];
    char http_version[1024];
}GET;

void server(const int port,void(*server_function)(int));
GET read_http(int newsockfd);
void write_http(GET get,int newsockfd);