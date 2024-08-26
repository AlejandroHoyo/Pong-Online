// Pong game
let ball;
let paddlePlayer1; 
let paddlePlayer2;
let scorePlayer1 = 0; 
let scorePlayer2 = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  let xBallPosition = width/2; 
  let yBallPosition = height/2;
  let ballRadio = 25;
  let speedPaddle = 20;
  let speedBall = 15;
  let widthPaddle = 45;
  let heightPaddle = 350;
  ball = new Ball(xBallPosition, yBallPosition, ballRadio, speedBall);
  paddlePlayer1 = new Paddle(widthPaddle * 3,  height/2 - heightPaddle / 2, speedPaddle, widthPaddle, heightPaddle); 
  paddlePlayer2 = new Paddle(width - widthPaddle * 3, height/2 - heightPaddle / 2, speedPaddle, widthPaddle, heightPaddle);

}

function draw() {

  // Ball update 
  background(200); 
  ball.displayBall();
  ball.updateBallMovement();
  
  ball.rightPaddleCollision(paddlePlayer2.position.x, paddlePlayer2.position.y, paddlePlayer2.width, paddlePlayer2.height);
  ball.leftPaddleCollision(paddlePlayer1.position.x, paddlePlayer1.position.y, paddlePlayer1.width, paddlePlayer1.height);


  // Games scores 
  textSize(30);
  textAlign(LEFT);
  text(scorePlayer1, 50, 30);


  if (ball.position.x > width ) {
    ball.position.y = height/2; 
    ball.position.x = width/2; 
    ball.velocity.x = ball.speed; 
    ball.velocity.y = 0;
    scorePlayer1++; 

} else if (ball.position.x < 0) {
  ball.position.y = height/2; 
    ball.position.x = width/2; 
    ball.velocity.x = ball.speed; 
    ball.velocity.y = 0;
    scorePlayer2++; 

}
  
  paddlePlayer1.updateMovement(UP_ARROW, DOWN_ARROW, height ); 
  paddlePlayer2.updateMovement(119,115, height); //Key codes for 'w' and 's'"
  paddlePlayer2.updateMovement(87, 83, height); //Key codes for 'W' and 'S'. It is the code for capital letters" 
  paddlePlayer1.displayPaddle(); 
  paddlePlayer2.displayPaddle(); 

 
}





