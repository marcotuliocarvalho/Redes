#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h> 
#include <arpa/inet.h>
#include <errno.h> 
#include <sys/time.h>

#define BUFFER_SIZE 27
     
#define TRUE   1 
#define FALSE  0 
#define PORT 8888
#define MAX_CLIENTS 4

//cria um vetor de socket para conectar com os clientes
int * create_server();

// cria um socket para o cliente se conectar ao servido
int create_client();