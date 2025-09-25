// Game constants
const WIDTH = 800;
const HEIGHT = 400;
const DINO_SIZE = 50;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;
const SPEED = 5;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;

// Game variables
let dino;
let obstacle;
let score = 0;
let isGameOver = false;

function setup() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
    resetGame();
}

function resetGame() {
    dino = {
        x: 100,
        y: HEIGHT - DINO_SIZE - 20,
        vy: 0,
        isJumping: false
    };
    
    obstacle = {
        x: WIDTH,
        y: HEIGHT - OBSTACLE_HEIGHT - 20
    };
    
    score = 0;
    isGameOver = false;
}

function draw() {
    // Clear background
    background(240);
    
    // Draw ground
    stroke(100);
    line(0, HEIGHT - 20, WIDTH, HEIGHT - 20);
    
    // Draw dino
    fill(50, 150, 255);
    noStroke();
    rect(dino.x, dino.y, DINO_SIZE, DINO_SIZE);
    
    // Draw dino eye
    fill(255);
    ellipse(dino.x + DINO_SIZE - 15, dino.y + 15, 10, 10);
    fill(0);
    ellipse(dino.x + DINO_SIZE - 15, dino.y + 15, 5, 5);
    
    if (!isGameOver) {
        // Update dino
        if (dino.isJumping) {
            dino.y += dino.vy;
            dino.vy += GRAVITY;
            
            if (dino.y > HEIGHT - DINO_SIZE - 20) {
                dino.y = HEIGHT - DINO_SIZE - 20;
                dino.isJumping = false;
                dino.vy = 0;
            }
        }
        
        // Update obstacle
        obstacle.x -= SPEED;
        if (obstacle.x < -OBSTACLE_WIDTH) {
            obstacle.x = WIDTH;
            score++;
        }
        
        // Draw obstacle
        fill(255, 100, 100);
        rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
        
        // Check collision
        if (checkCollision()) {
            isGameOver = true;
        }
    } else {
        // Game Over screen
        textSize(32);
        textAlign(CENTER);
        fill(255, 0, 0);
        text('Game Over!', WIDTH/2, HEIGHT/2);
        text('Score: ' + score, WIDTH/2, HEIGHT/2 + 40);
        text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 80);
    }
    
    // Score display
    fill(50);
    textSize(24);
    textAlign(LEFT);
    text('Score: ' + score, 20, 30);
}

function checkCollision() {
    return dino.x < obstacle.x + OBSTACLE_WIDTH &&
           dino.x + DINO_SIZE > obstacle.x &&
           dino.y < obstacle.y + OBSTACLE_HEIGHT &&
           dino.y + DINO_SIZE > obstacle.y;
}

function keyPressed() {
    if (key === ' ') {
        if (isGameOver) {
            resetGame();
        } else if (!dino.isJumping) {
            dino.isJumping = true;
            dino.vy = JUMP_FORCE;
        }
    }
}

function touchStarted() {
    if (isGameOver) {
        resetGame();
    } else if (!dino.isJumping) {
        dino.isJumping = true;
        dino.vy = JUMP_FORCE;
    }
    return false;
}