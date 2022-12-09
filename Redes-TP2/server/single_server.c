#include "single_server.h"

void single_server(int newsockfd)
{
    GET get = read_http(newsockfd);
    write_http(get,newsockfd);
    close(newsockfd);
}