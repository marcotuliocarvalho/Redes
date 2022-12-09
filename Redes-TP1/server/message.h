#include "game.h"

//cria a base da mensagem a ser enviada ao client
char *base_message(Game game);

//personaliza para cada player a mensagem
char *message(HandCards hand,int id,int index);