#include "content-type.h"

const char *get_filename_ext(const char *filename) {
    if(!strcmp(filename,"/"))
        return "html";
    const char *dot = strrchr(filename, '.');
    if(!dot || dot == filename) return "";
    return dot + 1;
}

const char * content_type(const char * filename)
{
    const char *type = get_filename_ext(filename);
    if(!strcmp(type,"gif"))
        return "image/gif";
    if(!strcmp(type,"ico"))
        return "image/x-icon";
    if(!strcmp(type,"json"))
        return "application/json";
    if(!strcmp(type,"png"))
        return "image/png";
    if(!strcmp(type,"css"))
        return "text/css";
    if(!strcmp(type,"js"))
        return "text/javascript";
    if(!strcmp(type,"svg"))
        return "image/svg+xml";
    return "text/html";    
}