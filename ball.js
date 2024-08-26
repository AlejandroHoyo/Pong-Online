class Ball {
    constructor(x,y,radio,speed) {
        this.position = createVector(x,y);
        this.initialHeight = y; 
        this.intitialWidth = x;         // this.velocity = createVector(15 * cos(random(radians(45))), 15 * sin(radians(45))); 
        this.velocity = createVector(speed, 0); // Velocidad en la que se mueve en eje X e Y
        this.radio = radio;
        this.speed = speed; 

    }

    displayBall() {
        ellipse(this.position.x, this.position.y, this.radio * 2); 
    }

    // Collision for the left paddle

    leftPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) {

        //this.updateBallMovement();
        
        if (this.collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight)){
            this.position.x = paddleX + paddleWidth;
            let differenceFromTop = this.position.y - paddleY; // This is the relative position
            this.position.x = paddleX + paddleWidth + this.radio;
            let angle = map(differenceFromTop, 0, paddleHeight, radians(-45), radians(45));
            this.velocity.x = this.speed * cos(angle); 
            this.velocity.y = this.speed * sin(angle); 
        }
    }   


    rightPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) {
       //this.updateBallMovement();

        if (this.collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight)){
            this.position.x = paddleX - this.radio;
            let differenceFromTop = this.position.y - paddleY; // This is the relative position
            if (differenceFromTop >= 0 && differenceFromTop <= paddleHeight/2) {
                let angle = map(differenceFromTop, 0, paddleHeight/2, radians(-135), radians(-180));
                this.velocity.x = this.speed * cos(angle); 
                this.velocity.y = this.speed * sin(angle); 
                if (angle === -180) {
                    this.velocity.x = -1 * this.speed;
                    this.velocity.y = 0;
                }
            }
            else {
                let angle = map(differenceFromTop, paddleHeight/2, paddleHeight, radians(180), radians(135));
                this.velocity.x = this.speed * cos(angle); 
                this.velocity.y = this.speed * sin(angle); 
            }
        }
    }

    updateBallMovement() {       
        // Movement of the ball
        this.position.add(this.velocity); 
        // Check borders
        if (this.position.y > height - this.radio || this.position.y < 0 + this.radio ) {
            this.velocity.y *= -1; 
        }
    }

    collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight){
        // Closest point on the rectangle to the center of the ball
        let closestX = constrain(this.position.x, paddleX, paddleX + paddleWidth);
        let closestY = constrain(this.position.y, paddleY, paddleY + paddleHeight); 

        // Distance between the ball's center and the closeset point
        let distanceX = this.position.x - closestX; 
        let distanceY =  this.position.y - closestY; 

        // Less than the circle radius the distance that is calculated from the poin
        let distance = sqrt((distanceX * distanceX) + (distanceY * distanceY)); 
        return distance < this.radio;

    }

    restartBall() {
        if (this.position.x > width || this.position.x < 0 ) {
            this.position.x = this.intitialWidth; 
            this.position.y = this.initialHeight; 
            this.velocity.x = this.speed; 
            this.velocity.y = 0; 
        }
    }


    // updateMovement(paddleX, paddleY, paddleWidth, paddleHeight, rad) {
    //     this.position.add(this.velocity); // Add the velocity to  
    //     // Check borders 



    //     // El problema esta en lo del map. Ver si se puede hacer de otra forma o no.

    //     // Collision with the ball
    //     if (this.collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight)){
    //         let differenceFromTop = this.position.y - paddleY; // This is the relative position

    //         differenceFromTop = constrain(differenceFromTop, 0, paddleHeight);
    //         if (rad === radians(45)) {
    //             console.log("45");
    //             this.position.x = paddleX + paddleWidth + this.radio;

    //         } else {
    //             console.log("135");
    //             this.position.x = paddleX - this.radio ;
    //             if (differenceFromTop >= 0 && differenceFromTop <= paddleHeight/2) {
    //             let angle = map(differenceFromTop, 0, paddleHeight/2, radians(-135), radians(-180));
    //             this.velocity.x = 15 * cos(angle); 
    //             this.velocity.y = 15 * sin(angle); 

    //             if (angle === -180) {
    //                 console.log("Dentro")
    //                 this.velocity.x = -15
    //                 this.velocity.y = 0;
    //             }
    //         }
    //         else {
    //             let angle = map(differenceFromTop, paddleHeight/2, paddleHeight, radians(180), radians(135));
    //             this.velocity.x = 15 * cos(angle); 
    //             this.velocity.y = 15 * sin(angle); 
    //         }

    //         }

    //         let angle = map(differenceFromTop, 0, paddleHeight, -rad, rad); 


    //         // console.log(cos(radians(180)));
    //         // console.log(cos(radians(-135)));

    //         // console.log(sin(radians(0)));
    //         // console.log(sin(radians(-135)));

    //         // this.velocity.x = 15 * cos(angle); 
    //         // this.velocity.y = 15 * sin(angle);
    //         // console.log(" this.velocity.x",  this.velocity.x);
    //         // console.log(" this.velocity.y",  this.velocity.y); 
    //     }
    // }

    // updateScore(player1Score, player2Score) {

    //     // TODO. Esto tiene que devolver un return para que me lo enseñe en el text en el main sceckth. Probar con el consturctor
    //         if (this.position.x > width - this.radio ) {
    //             player1Score++;
    //         } else if (this.position.x < this.radio) {
    //             player2Score++; 
    //         }
    //         this.restartBall(); 
    //     }
    

}
