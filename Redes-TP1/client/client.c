#include "../socket/socket.h"
#include <string.h>
#include "message.h"

char *suit(char s)
{
    if(s =='C')return "♣";
    if(s =='H')return "♥";
    if(s =='S')return "♠";
    if(s =='D')return "♦";
    return " ";
}

void printCards(char *cards, int size)
{
    for(int i = 0; i < size; i++)
    {
        if(cards[i]=='-')
            break;
        if(i%2)
        {
            printf("%s ",suit(cards[i]));
        }else
            printf("%c",cards[i]);
    }
    printf("\n");
}

void printInfo(ServerMessage msg)
{
    system("clear");
        printf("Nosso time: %i\n",msg.myteam);
        printf("\n**Vitorias**\n");
        printf("Time 0: %i\n",msg.score[0]);
        printf("Time 1: %i\n",msg.score[1]);
        printf("\n**Mãos vencidas**\n");
        printf("Time 0: %i\n",msg.hand[0]);
        printf("Time 1: %i\n",msg.hand[1]);
        
        printf("\nCartas jogadas no round: ");
        printCards(msg.round_cards,8);
        printf("\nCartas ja utilizadas: ");
        printCards(msg.used,6);
        printf("\nCartas disponiveis para jogar: ");
        printCards(msg.cards,6);

        printf("\n");
        if(msg.play)
            printf("É sua vez de jogar, escolha sua carta: ");
}

int main(int argc, char *argv[])
{
    printf("Cliente Iniciando!\n");
    //cria o cliente
    int sockfd = create_client(), n;
    char buffer[BUFFER_SIZE];
    while(1)
    {
        // le os dados recebidos do servidor
        read(sockfd,buffer,BUFFER_SIZE);
        //monta a mensagem do servidor
        ServerMessage msg = mount(buffer);
        //exibe os dados no terminal
        printInfo(msg);
        //se for a vez do cliente, ele faz uma ação
        if(msg.play)
        {                
            int card,n;
            scanf("%i",&card);            
            do
            {
                buffer[0]=card+'0';
                n = write(sockfd,buffer,1);
            }while(n<0);
        }
        //libera memoria
        free(msg.hand);
        free(msg.score);
        free(msg.cards);
        free(msg.used);
    }
}