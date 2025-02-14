function checkForcollision({ hero , Enemy }) {
    return (
        hero.hitBox.position.x + hero.hitBox.width >= Enemy.position.x
        && hero.hitBox.position.x <= Enemy.position.x + Enemy.width &&
        hero.hitBox.position.y + hero.hitBox.height >= Enemy.position.y &&
        hero.hitBox.position.y <= Enemy.position.y + Enemy.height
    )
}

function determineWinner({player,player2,timerId}){
    clearTimeout(timerId);
    document.querySelector('#winner').style.display = "flex"
    if(player.health===player2.health){
        document.querySelector('#winner').innerHTML = "Tie"
    }
    else if(player.health > player2.health){
        document.querySelector('#winner').innerHTML = "Player 1 won"
        player2.switchSprite("Death")
    }
    else if(player.health < player2.health){
        document.querySelector('#winner').innerHTML = "Player 2 won"
        player.switchSprite("Death")

    }
}

var timer = 60;
var timerId;
function decreseTimer() {
   timerId = setTimeout(decreseTimer,1000);
    if(timer>0){
        timer--;
        document.querySelector("#timer").innerHTML = timer
    }
    if(timer === 0){
        determineWinner({player,player2,timerId});
    }
  
}