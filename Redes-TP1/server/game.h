#include <stdio.h>
#include <stdlib.h>

enum Suit
{
    Spades = 1,
    Diamond = 2,
    Clubs = 3,
    Heart = 4
};

enum Letter
{
    Ace = 8,
    Two = 9,
    Three = 10,
    Four = 1,
    Five = 2,
    Six = 3,
    Seven = 4,
    Joker = 6,
    Queen = 5,
    King = 7
};

typedef struct Card
{
    enum Letter letter;
    enum Suit suit;
} Card;

typedef struct HandCards
{
    Card *cards,*used;
    int count_cards, count_used;
} HandCards;

typedef struct Score
{
    int team_one, team_zero;
}Score;

typedef struct Hand
{
    int start_player,hand_player;
    HandCards *hand_cards;
    Card *cards;
    int cards_used;
    int team_one,team_zero;
}Hand;

typedef struct Game
{
    int *clients;
    Score score;
    Hand hand;
} Game;

//inicializa a estrutura de jogo
void initialize_game();

//inicializa um novo round, 
// onde cada player jogara uma carta cada um
void initialize_round();

//finaliza o round, 
// soma a mao vencida ao time do player que venceu
// seleciona o player vencedor como o primeiro a jogar a proxima
int finalize_round();

//inicializa a mao, alterando o player a ser mão,
// cria as cartas de cada player
void initialize_hand();

//finaliza a mao,
// e exclui os ponteiros para nao estourar a memoria
void finalize_hand();

// envia as informações do jogo aos jogadores
void send_round_state(int id);

//aguarda uma ação do jogador
void wait_player_action(int index);