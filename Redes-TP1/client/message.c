#include "message.h"

ServerMessage mount(char *buffer)
{
    ServerMessage message;
    message.cards = (char*)malloc(sizeof(char)*7);
    message.used = (char*)malloc(sizeof(char)*7);
    message.score = (int*)malloc(sizeof(int)*2);
    message.hand = (int*)malloc(sizeof(int)*2);
    for(int i = 0; i < 6;i++)
    {
        message.used[i] = buffer[6+i];
        message.cards[i] = buffer[i];
    }
    message.cards[6] = '\0';
    message.used[6] = '\0';
    
    message.score[0] = buffer[22]-'0';
    message.score[1] = buffer[23]-'0';
    message.hand[0] = buffer[24]-'0';
    message.hand[1] = buffer[25]-'0';

    message.myteam = buffer[12]-'0';
    message.play = buffer[13]-'0';
    message.round_cards = (char*)malloc(sizeof(char)*9);
    for(int i = 0; i < 8;i++)
        message.round_cards[i] = buffer[14+i];
    message.round_cards[8] = '\0';
    return message;
}