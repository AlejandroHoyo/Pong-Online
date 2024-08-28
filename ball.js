class Ball {
    constructor(x, y, radio, speed) {
        this.position = createVector(x, y);
        this.initialHeight = y;
        this.intitialWidth = x;
        this.velocity = createVector(speed, 0);
        this.radio = radio;
        this.speed = speed;
    }

    displayBall() {
        ellipse(this.position.x, this.position.y, this.radio * 2);
    }

    leftPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) {

        if (this.collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight)) {
            this.position.x = paddleX + paddleWidth;
            let differenceFromTop = this.position.y - paddleY; // This is the relative position
            this.position.x = paddleX + paddleWidth + this.radio;
            let angle = map(differenceFromTop, 0, paddleHeight, radians(-45), radians(45));
            this.velocity.x = this.speed * cos(angle);
            this.velocity.y = this.speed * sin(angle);
        }
    }

    rightPaddleCollision(paddleX, paddleY, paddleWidth, paddleHeight) {

        if (this.collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight)) {
            this.position.x = paddleX - this.radio;
            let differenceFromTop = this.position.y - paddleY; // This is the relative position
            if (differenceFromTop >= 0 && differenceFromTop <= paddleHeight / 2) {
                let angle = map(differenceFromTop, 0, paddleHeight / 2, radians(-135), radians(-180));
                this.velocity.x = this.speed * cos(angle);
                this.velocity.y = this.speed * sin(angle);
                if (angle === -180) {
                    this.velocity.x = -1 * this.speed;
                    this.velocity.y = 0;
                }
            }
            else {
                let angle = map(differenceFromTop, paddleHeight / 2, paddleHeight, radians(180), radians(135));
                this.velocity.x = this.speed * cos(angle);
                this.velocity.y = this.speed * sin(angle);
            }
        }
    }

    updateBallMovement() {
        // Movement of the ball
        this.position.add(this.velocity);
        // Check borders
        if (this.position.y > height - this.radio || this.position.y < 0 + this.radio) {
            this.velocity.y *= -1;
        }
    }

    collisionWithPaddle(paddleX, paddleY, paddleWidth, paddleHeight) {
        // Closest point on the rectangle to the center of the ball
        let closestX = constrain(this.position.x, paddleX, paddleX + paddleWidth);
        let closestY = constrain(this.position.y, paddleY, paddleY + paddleHeight);

        // Distance between the ball's center and the closeset point
        let distanceX = this.position.x - closestX;
        let distanceY = this.position.y - closestY;

        // Less than the circle radius the distance that is calculated from the poin
        let distance = sqrt((distanceX * distanceX) + (distanceY * distanceY));
        return distance < this.radio;
    }
}