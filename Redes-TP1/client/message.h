#include <stdlib.h>

typedef struct Card
{
    char letter,suit;
}Card;

typedef struct ServerMessage
{
    char *cards;
    char *used;    
    char *round_cards;
    int round,myteam,play,points;
    int *score,*hand;
}ServerMessage;

//Coloca as informações do servidor em 
// uma estrutura para facilitar a exibição dos dados
ServerMessage mount(char *buffer);