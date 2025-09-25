// Game constants
const WIDTH = 800;
const HEIGHT = 400;
const DINO_SIZE = 50;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;
const BASE_SPEED = 5;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;

// Game variables
let dino;
let obstacle;
let score = 0;
let isGameOver = false;
let animationFrame = 0;

// Image variables
let backgroundImage;

function preload() {
    console.log('Loading images...');
    // Load background
    backgroundImage = loadImage('assets/Untitled.png');
    console.log('Images loaded');
}

function setup() {
    // Create and position the canvas
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
    
    // Initialize game
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
    // Draw background
    if (backgroundImage) {
        // Scale the background to cover the canvas while maintaining aspect ratio
        let bgScale = Math.max(WIDTH / backgroundImage.width, HEIGHT / backgroundImage.height);
        let scaledWidth = backgroundImage.width * bgScale;
        let scaledHeight = backgroundImage.height * bgScale;
        
        // Center the background
        let x = (WIDTH - scaledWidth) / 2;
        let y = (HEIGHT - scaledHeight) / 2;
        
        image(backgroundImage, x + scaledWidth/2, y + scaledHeight/2, scaledWidth, scaledHeight);
    } else {
        background(0);
    }
    
    if (!isGameOver) {
        updateGame();
    } else {
        showGameOver();
    }
    
    // Draw score
    fill(255);
    textSize(20);
    text('Score: ' + score, 20, 30);
}

function updateGame() {
    // Update dino
    if (dino.isJumping) {
        dino.y += dino.vy;
        dino.vy += GRAVITY;
        
        if (dino.y >= HEIGHT - DINO_SIZE - 20) {
            dino.y = HEIGHT - DINO_SIZE - 20;
            dino.isJumping = false;
            dino.vy = 0;
        }
    }
    
    // Update obstacle
    obstacle.x -= BASE_SPEED;
    if (obstacle.x < -OBSTACLE_WIDTH) {
        obstacle.x = WIDTH;
        score++;
    }
    
    // Check collision
    if (checkCollision()) {
        isGameOver = true;
    }
    
    // Draw game elements
    drawGameElements();
}

function drawGameElements() {
    // Draw dino
    push();
    if (dino.isJumping) {
        // Jump pose - triangle pointing up
        fill(255);
        triangle(
            dino.x + DINO_SIZE/2, dino.y,
            dino.x, dino.y + DINO_SIZE,
            dino.x + DINO_SIZE, dino.y + DINO_SIZE
        );
    } else {
        // Running pose - alternating leaning forward/backward
        fill(255);
        if (frameCount % 10 < 5) {
            // Leaning forward
            quad(
                dino.x, dino.y + DINO_SIZE,
                dino.x + DINO_SIZE, dino.y + DINO_SIZE,
                dino.x + DINO_SIZE + 10, dino.y + DINO_SIZE/2,
                dino.x + DINO_SIZE/2, dino.y
            );
        } else {
            // Leaning backward
            quad(
                dino.x, dino.y + DINO_SIZE,
                dino.x + DINO_SIZE, dino.y + DINO_SIZE,
                dino.x + DINO_SIZE - 10, dino.y,
                dino.x + DINO_SIZE/2, dino.y + DINO_SIZE/2
            );
        }
    }
    pop();
    
    // Draw obstacle
    push();
    fill(255, 0, 0);
    rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
    pop();
}

function showGameOver() {
    drawGameElements();
    
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text('Game Over!', WIDTH/2, HEIGHT/2 - 40);
    textSize(24);
    text('Score: ' + score, WIDTH/2, HEIGHT/2);
    text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 40);
}

function checkCollision() {
    return dino.x < obstacle.x + OBSTACLE_WIDTH &&
           dino.x + DINO_SIZE > obstacle.x &&
           dino.y < obstacle.y + OBSTACLE_HEIGHT &&
           dino.y + DINO_SIZE > obstacle.y;
}

function keyPressed() {
    if (key === ' ' || keyCode === UP_ARROW) {
        if (isGameOver) {
            resetGame();
        } else if (!dino.isJumping) {
            dino.isJumping = true;
            dino.vy = JUMP_FORCE;
        }
    }
}

function touchStarted() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        if (isGameOver) {
            resetGame();
        } else if (!dino.isJumping) {
            dino.isJumping = true;
            dino.vy = JUMP_FORCE;
        }
    }
    return false;
}