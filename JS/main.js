
var  player = {
    top: 540, //y-axis
    left: 370 //x-axis
};

var score =0;
let isTheGameOver = false;

const gameWidth = 800;
const playerWidth = 50;
const alienWidth = 50;

var lazers = []; //stores the location of the lazers

//key codes for the leftArrow, rightArrow, and space
const keyCodeRight = 39;
const keyCodeLeft =  37;
const keyCodeSpace = 32;

var aliens = [
    { left: 70, top: 50 },
    { left: 170, top: 50 },
    { left: 270, top: 50 },
    { left: 370, top: 50 },
    { left: 470, top: 50 },
    { left: 570, top: 50 },
    { left: 670, top: 50 },
    { left: 70, top: 120 },
    { left: 170, top: 120 },
    { left: 270, top: 120 },
    { left: 370, top: 120 },
    { left: 470, top: 120 },
    { left: 570, top: 120 },
    { left: 670, top: 120 },
];

document.onkeydown = function(e){
      //.keycode gets the Unicode value of the pressed keyboard key
    if (e.keyCode === keyCodeLeft){
        console.log("left");
        player.left -=10;
        movePlayer();
    }if (e.keyCode === keyCodeRight){
        console.log("right");
        player.left +=10;
        movePlayer();
    }if (e.keyCode === keyCodeSpace){
        console.log("lazer");
        lazers.push({
            left: player.left + 20,
            top: player.top -25
        });
        showLazers();
        const lazerAudio = new Audio("sounds/sfx_laser1.ogg");
        lazerAudio.play();
    }
    player.left = contain(player.left,playerWidth,gameWidth - playerWidth);
};

//This function is called to move the player by px
function movePlayer(){
    document.getElementById('player').style.left = player.left + "px";
};

//This function shows the lazers in the html page 
function showLazers(){
    document.getElementById('lazers').innerHTML = "";
    for(var x = 0; x < lazers.length ; x++){
        document.getElementById('lazers').innerHTML += `<div class='lazer' style='left:${lazers[x].left}px; top:${lazers[x].top}px'></div>`;
    }
};

//This function moves the lazers by 3, the speed of the lazer can be altered here. It also contains the dissapear condition
function moveLazer(){
    for(var x = 0; x < lazers.length ; x++){
        lazers[x].top -= 3;
        if(lazers[x].top <= 10){ //when the lazer's y-axis is 10, meaning it's at the background's top width, it shoud disappear 
            lazers.splice(x,1);
        }
    }
};

//This function shows the aliens in the html page
function showAliens(){
    document.getElementById('aliens').innerHTML = "";
    for(var x = 0; x < aliens.length ; x++){
        document.getElementById('aliens').innerHTML += `<div class='alien' style='left:${aliens[x].left}px; top:${aliens[x].top}px'></div>`;
    }
};

//This function moves the aliens by 3, the speed of the alien can be altered here.It also contins the dissapear condition for the alien and calles for gameOver function
function moveAlien(){
    for(var x = 0; x < aliens.length ; x++){
        aliens[x].top += 3; //Alien movement speed 
        if(aliens[x].top >= 540){
            aliens.splice(x,1);
            console.log("you lose");
           if( isTheGameOver == false){
           gameOver();
          }
        }
    }
};

//When the aliens reach the y-axis of the player it's game over.
function gameOver(){
    isTheGameOver =true;
   console.log("inside gameOver function");
        document.querySelector(".lose").style.display = "block"; 
        const gameOverAudio = new Audio("sounds/sfx_lose.ogg");
        gameOverAudio.play();
};

//This function detects the lazers when it hits the alien, then removes the alien that has been hit and the lazer
function lazerDetection(){
    for(var i = 0; i < aliens.length ; i++){
        for(var x = 0; x < lazers.length ; x++){
            if((lazers[x].top <= aliens[i].top+50) && (lazers[x].top >= aliens[i].top) && (lazers[x].left >= aliens[i].left) && (lazers[x].left <= aliens[i].left+50)){
                console.log("remove condition");
                aliens.splice(i,1); //removing one alien from i position
                lazers.splice(x,1); //removing the lazer when it hits the alien 
                score +=50;
                //document.querySelector(".score").innerHTML = score;
                if(aliens.length === 0){
                    document.querySelector(".won").style.display = "block";
                    // document.querySelector("#total").innerHTML = score;
                } 
            }
        }
    }
};

/* function winning(){
    return aliens.length === 0;
} */

//gameLoop starts the game in a loop of 100 seconds.
function gameLoop(){
    setTimeout(gameLoop, 100);//setTimeout() will let me do something every x seconds 
    moveLazer();
    showLazers();
    showAliens();
    moveAlien();
    lazerDetection()
};

//this function contains the player inside the gaming box
function contain(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
 };

gameLoop();

