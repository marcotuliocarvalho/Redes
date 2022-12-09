#include "message.h"
#include "../socket/socket.h"
char cards_letters[] = "@4567QJKA23";
char cards_suits[] = "@SDCH";

char *buffer = NULL;

char *base_message(Game game)
{
    if(!buffer)
    buffer = (char*)malloc(sizeof(char)*BUFFER_SIZE);
    for(int j = 0; j < 4; j++)
    {
        int have_cards = j < game.hand.cards_used;
        buffer[14+j*2] = have_cards?cards_letters[game.hand.cards[j].letter]:'-';
        buffer[14+j*2+1] = have_cards?cards_suits[game.hand.cards[j].suit]:'-';
    }

    buffer[23] = game.score.team_one+'0';
    buffer[22] = game.score.team_zero+'0';
    buffer[24] = game.hand.team_one+'0';
    buffer[25] = game.hand.team_zero+'0';
    buffer[BUFFER_SIZE-1] = '\0';
}

char *message(HandCards hand,int id,int index)
{
    for(int j = 0; j < 3; j++)
    {
        int have_cards = j < hand.count_cards;
        buffer[j*2] = have_cards?cards_letters[hand.cards[j].letter]:'-';
        buffer[j*2+1] = have_cards?cards_suits[hand.cards[j].suit]:'-';
    
        int have_used = j < hand.count_used;
        buffer[6+j*2] = have_used?cards_letters[hand.used[j].letter]:'-';
        buffer[6+j*2+1] = have_used?cards_suits[hand.used[j].suit]:'-';
    }
    
    buffer[12] = (index%2)+'0';
    buffer[13] = (id == index)+'0';

    for(int i = 0; i < BUFFER_SIZE;i++)
        printf("%c",buffer[i]);
    printf("\n");
    return buffer;
}