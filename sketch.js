// Pong game
let ball;
let paddlePlayer1; 
let paddlePlayer2;
let scorePlayer1 = 0; 
let scorePlayer2 = 0;
let gameOver = false
const pointsWinner = 4;


function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  let xBallPosition = width/2; 
  let yBallPosition = height/2;
  let ballRadio = 25;
  let speedPaddle = 20;
  let speedBall = 15;
  let widthPaddle = 45;
  let heightPaddle = 350;
  ball = new Ball(xBallPosition, yBallPosition, ballRadio, speedBall);
  paddlePlayer1 = new Paddle(widthPaddle * 3,  height/2 - heightPaddle/2, speedPaddle, widthPaddle, heightPaddle); 
  paddlePlayer2 = new Paddle(width - widthPaddle * 3, height/2 - heightPaddle/2, speedPaddle, widthPaddle, heightPaddle);

}

function draw() {
  
    background(200);


    if (scorePlayer1 === pointsWinner || scorePlayer2 === pointsWinner) {
      gameOver = true
      let winner = scorePlayer1 === pointsWinner ? "jugador de la izquierda" : "jugador de la derecha"; 
      textSize(100);
      textAlign(CENTER);
      text(`Felicidades, ha ganado el ${winner}`, width/2 - 150, height/2 - 150);
      text("Pulsa el mouse para nueva partida", width/2 - 100, height/2 + 150);

    } else if (!gameOver){

    textSize(90);
    // Left score
    textAlign(LEFT);
    text(scorePlayer1, 230, 120);
    // Right score
    text(scorePlayer2, width-230, 120);

    textAlign(CENTER);

    text(`Gana quién llegue a ${pointsWinner} puntos`,width/2, 150);
  
    
 
    ball.displayBall();
    ball.updateBallMovement();
  
    ball.rightPaddleCollision(paddlePlayer2.position.x, paddlePlayer2.position.y, paddlePlayer2.width, paddlePlayer2.height);
    ball.leftPaddleCollision(paddlePlayer1.position.x, paddlePlayer1.position.y, paddlePlayer1.width, paddlePlayer1.height);

  // Restart the ball and upadate the scores
    if (ball.position.x > width ) {
      ballRestartBall();
      scorePlayer1++; 

  } else if (ball.position.x < 0) {
      ballRestartBall();
      scorePlayer2++; 
  }
  paddlePlayer1.updateMovement(UP_ARROW, DOWN_ARROW, height );

  paddlePlayer2.updateMovement(119,115, height); //Key codes for 'w' and 's'"
  paddlePlayer2.updateMovement(87, 83, height); //Key codes for 'W' and 'S'. It is the code for capital letters" 

  paddlePlayer1.displayPaddle(); 
  paddlePlayer2.displayPaddle();
    }
  
  }
function mousePressed() {

  if (gameOver) {
    gameOver = false;
    ballRestartBall();
    paddlePlayer1.position.y = height/2 - paddlePlayer2.height/2
    paddlePlayer2.position.y = height/2 - paddlePlayer2.height/2;
    scorePlayer1 = 0; 
    scorePlayer2 = 0;
  }
}


function ballRestartBall() {
  ball.position.y = height/2; 
  ball.position.x = width/2; 
  ball.velocity.x = ball.speed; 
  ball.velocity.y = 0;

}
