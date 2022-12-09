// #include "game.h"
#include "../socket/socket.h"
#include <time.h>
#include "message.h"

Game game;

Card *cards = NULL;

Card create_card(enum Letter letter,enum Suit suit)
{
    Card card;
    card.letter = letter;
    card.suit = suit;
    return card;
}

HandCards create_hand(Card first, Card second, Card third)
{
    HandCards hand;
    hand.cards = (Card*)malloc(sizeof(Card)*3);
    hand.used = (Card*)malloc(sizeof(Card)*3);
    hand.cards[0] = first;
    hand.cards[1] = second;
    hand.cards[2] = third;
    hand.count_cards = 3;
    hand.count_used = 0;
    return hand;
}

HandCards* create_hands()
{
    if(cards == NULL)
    {
        int count = 0;
        cards = (Card*)malloc(sizeof(Card)*10*4);
        for(int j = 1; j <= 10; j++)
            for(int i = 1; i <= 4; i++)
                cards[count++] = create_card(j,i);       
    }
    int count = 0;
    int cards_number[12];
    Card hand_cards[3];
    HandCards *hand = (HandCards*)malloc(sizeof(HandCards)*4);
    for(int i = 0; i < 12; i ++)
    {   
        int n = rand()%(40-count);
        for(int j = 0; j < count;j++)
            if(cards_number[j]<=n)
                n++;
        
        cards_number[count++] = n;
        hand_cards[i%3] = cards[n];
        if(i%3==2)
            hand[i/3] = create_hand(hand_cards[0],hand_cards[1],hand_cards[2]);
    }
    return hand;
}

int valuation(Card card)
{
    if(card.letter == Four && card.suit == Clubs)
        return 14;
    if(card.letter == Seven && card.suit == Heart)
        return 13;
    if(card.letter == Ace && card.suit == Spades)
        return 12;
    if(card.letter == Seven && card.suit == Diamond)
        return 11;
    return card.letter;
}

int winner(Card *round_cards)
{
    int best = 0,id = 0;
    for(int i = 0; i < 4; i++)
    {
        int value = valuation(round_cards[i]);
        if(best <= value)
        {
            best = value;
            id = i;
        }
    }
    return id;
}

void initialize_game()
{
    srand(time(NULL));
    printf("Starting game!");
    fflush(stdout);
    game.clients = create_server();
    game.score.team_one = 0;
    game.score.team_zero = 0;
    game.hand.hand_player = rand()%4;
}

void initialize_hand()
{
    printf("Starting hand!\n");
    game.hand.hand_player = (game.hand.hand_player+1)%4;
    game.hand.start_player = game.hand.hand_player;
    game.hand.hand_cards = create_hands();
    game.hand.team_one = 0;
    game.hand.team_zero = 0;
}

void finalize_hand()
{
    for(int i = 0; i < 4;i++)
        free(game.hand.hand_cards[i].cards);
    free(game.hand.hand_cards);
    printf("Hand finished!\n");
}

void initialize_round()
{
    game.hand.cards = (Card*)malloc(sizeof(Card)*4);
    game.hand.cards_used = 0;
}

void send_round_state(int index)
{
    base_message(game);
    int id = (game.hand.start_player+index)%4;
    if(index == -1)
        id = index;

    for(int i = 0; i < 4;i++)
    {
        char *buffer = message(game.hand.hand_cards[i],id,i);
        write(game.clients[i],buffer,BUFFER_SIZE);
    }
    printf("\n");
}

void wait_player_action(int index)
{
    int id = (game.hand.start_player+index)%4;
    HandCards *hands = game.hand.hand_cards;
    printf("Player %i action!\n",id);
    char buffer[16];
    while(1)
    {
        read(game.clients[id],buffer,1);
        // if(n<0)
        //     continue;
        int card_index = (buffer[0]-'0')-1;
        game.hand.cards[game.hand.cards_used++] = hands[id].cards[card_index];
        hands[id].used[hands[id].count_used++] = hands[id].cards[card_index];
        for(int i = card_index;i<(3-1);i++)
            hands[id].cards[i] = hands[id].cards[i+1];
        hands[id].count_cards--;
        break;
    }
}

int finalize_round()
{
    int index = winner(game.hand.cards);
    int id = (game.hand.start_player+index)%4;
    if(id%2)game.hand.team_one++;
    else game.hand.team_zero++;
    if(game.hand.team_one == 2)
        game.score.team_one++;
    else if(game.hand.team_zero == 2)
        game.score.team_zero++;
    game.hand.start_player = id;
    free(game.hand.cards);
    return game.hand.team_one == 2 || game.hand.team_one == 2;
}