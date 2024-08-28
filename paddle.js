class Paddle {
    constructor(x, y, paddleSpeed, w, h) {
        this.position = createVector(x, y);
        this.speed = paddleSpeed;
        this.initialSpeed = paddleSpeed;
        this.width = w;
        this.height = h;
    }

    displayPaddle() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    updateMovement(upMovement, downMovement, maximumHeight) {
        if (keyIsDown(upMovement)) {
            this.position.y -= this.speed;

        } else if (keyIsDown(downMovement)) {
            this.position.y += this.speed;
        }
        this.checkBorders(maximumHeight);
    }

    checkBorders(maximumHeight) { // It is better to check each case in a separate way 

        // Stop movement if the paddle goes out of bounds
        if (this.position.y < 0) {
            this.position.y = 0;
            this.speed = 0;

        } else if (this.position.y + this.height > maximumHeight) {
            this.position.y = maximumHeight - this.height;
            this.speed = 0;
        } else {
            this.speed = this.initialSpeed;
        }
    }

}