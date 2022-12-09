#include "server.h"
#include "content-type.h"

FileData open_file(char * file_name)
{
    FileData data;
    // opening the file in read mode
    FILE* fp = fopen(file_name, "rb");
  
    // checking if the file exist or not
    if (fp == NULL) {
        
        printf("[-] File Not Found!\n");
        strcpy(data.status,"404 Not Found");
        data.data = (char*)malloc(sizeof(char));
        strcpy(data.data,"\0");
        return data;
    }  

    fseek(fp, 0L, SEEK_END);
    data.content_length = ftell(fp);
    fseek(fp, 0, SEEK_SET);

    /* allocate memory for entire content */
    data.data = (char*)malloc(sizeof(char)*data.content_length+1 );
    if(!data.data) fclose(fp),fputs("memory alloc fails",stderr),exit(1);

    /* copy the file into the buffer */
    if( 1!=fread( data.data ,(size_t)data.content_length,1, fp) )
        fclose(fp),free(data.data),fputs("entire read fails",stderr),exit(1);
    
    strcpy(data.status,"200 OK");
    // closing the file
    fclose(fp);
    strcpy(data.content_type,content_type(file_name));  
    return data;
}

void write_http(GET get,int newsockfd)
{
    if(!strcmp(get.file,"/"))
        strcpy(get.file,"/index.html");
    char filename[1024] = "files";
    strcat(filename,get.file);
    FileData data = open_file(filename);
    char response[4096];
    sprintf(
        response,
        "%s %s\r\n"
        "Content-Length: %i\r\n"
        "Content-Type: %s\r\n"
        "Connection: keep-alive\r\n"
        "\r\n",
        get.http_version,
        data.status,
        data.content_length,
        data.content_type
    );
    write(newsockfd,response,strlen(response));
    write(newsockfd,data.data,data.content_length);
    free(data.data);
}

GET read_http(int newsockfd)
{
    GET get;
    char buffer[32][2048];
    int cl = 0,cr = 0;
    while(1)
    {
        read(newsockfd,&buffer[cl][cr],1);
        cr++;
        if(cr > 1 && buffer[cl][cr-2] == '\r' && buffer[cl][cr-1] == '\n')
        {
            buffer[cl][cr] = '\0'; 
            if(!strncmp("GET",buffer[cl],3))
            {
                int count = 0;
                char * line = strtok(buffer[cl]," ");
                while(line && count < 3)
                {
                    
                    if(count == 1)
                        strcpy(get.file,line);
                    else if(count == 2)
                        strcpy(get.http_version,line);
                    line = strtok(NULL," ");
                    count++;
                }
                break;                
            }
            cl++;
            if(cr == 2)
                break;
            cr = 0;
        }
    }
    
    return get;
}

void server(const int port,void(*server_function)(int))
{
    int newsockfd,sockfd = socket_fd(port);
    listen(sockfd,5);
    struct sockaddr_in cli_addr;
    socklen_t clilen = sizeof(cli_addr);
    while(1)
    {
        newsockfd = accept(sockfd, 
                 (struct sockaddr *) &cli_addr, 
                 &clilen);
        
        server_function(newsockfd);
    }
}