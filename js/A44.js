//	Name: Emidio Guidotti
//	File: A44
//	Date: 22 March 2024
//	Better Ball Game Scipt

// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
// get the score board
const para = document.querySelector('p');
// initialize the score
let score = 0;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// define the main object class of these avatars
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// define the enemy
class Ball extends Shape {
  // construct with randomized values
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  // display a ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // program the balls movement
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
     for (const ball of balls) {
        if (!(this === ball) && ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
      }
    }
  }
}

// define the player ball
class EvilCircle extends Shape {
    // constructor with set elements
    constructor(x, y) {
        super(x, y, 20, 20)
        this.color = 'white';
        this.size = 10;
        // define palyer actions
        window.addEventListener("keydown", (e) => {
          switch (e.key) {
            case "a":
              this.x -= this.velX;
              break;
            case "d":
              this.x += this.velX;
              break;
            case "w":
              this.y -= this.velY;
              break;
            case "s":
              this.y += this.velY;
              break;
              }
          });
    }

    // function to display the player
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // stop player from leaving the game
    checkBounds() {
        if (this.x + this.size >= width) {
          this.x -= this.size;
        }

        if (this.x - this.size <= 0) {
          this.x += Math.abs(this.size);
        }

        if (this.y + this.size >= height) {
          this.y -= this.size;
        }

        if (this.y - this.size <= 0) {
          this.y += this.size;
        }
      }

      // deactivate ball that has been "tagged"
      collisionDetect() {
         for (const ball of balls) {
            if (ball.exists) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < this.size + ball.size) {
                ball.exists = false;
                score--;
                }
            }
        }
      }
}

// instantiate the ball list
const balls = [];

// instantiate the players avatar
const connivingCircle = new EvilCircle (50, 50);

// initialize all balls
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  score++;
}

// the main program running
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  para.textContent = `Score: ${score}`; // update the score

  // remove any ball that has been eaten
  for (const ball of balls) {
    if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
  }
  connivingCircle.draw();
  connivingCircle.checkBounds();
  connivingCircle.collisionDetect();
  requestAnimationFrame(loop);
  // win condition
  if (!score) {
    para.textContent = "You Win!";
  }
}

loop();