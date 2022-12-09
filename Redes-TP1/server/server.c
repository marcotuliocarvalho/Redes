#include "game.h"
#include <unistd.h>

int main(int argc, char *argv[])
{
   initialize_game();
   while(1) {
      initialize_hand();
      for(int i = 0; i < 3;i++)
      {
         initialize_round();
         send_round_state(-1);
         sleep(3);
         for(int i = 0; i < 4; i++)
         {  
            send_round_state(i);
            wait_player_action(i);
         }
         if(finalize_round())
            break;
      }
      finalize_hand();
   }
   return 0; 
}