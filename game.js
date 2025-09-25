// Game constants
const WIDTH = 800;
const HEIGHT = 400;
const DINO_SIZE = 50;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_SPEED = 6;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;

// Game variables
let dino;
let obstacle;
let score;
let gameOver;
let highScore = 0;

function setup() {
    // Create canvas and center it
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');

// Game variables
let dino;
let obstacle;
let score;
let gameOver;
let background;

// Setup function runs once at the start
function setup() {
    // Create canvas inside gameContainer
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('gameContainer');
    
    // Set framerate
    frameRate(60);
    
    // Initialize game
    resetGame();
}

// Reset game state
function resetGame() {
    dino = {
        x: 100,
        y: HEIGHT - DINO_SIZE - 20,
        velY: 0,
        isJumping: false
    };

    obstacle = {
        x: WIDTH + 400,
        y: HEIGHT - OBSTACLE_HEIGHT - 20
    };

    score = 0;
    gameOver = false;
    
    // Clear any existing intervals
    if (window.gameInterval) {
        clearInterval(window.gameInterval);
    }
}

// Draw function runs every frame
function draw() {
    // Clear background with white
    background(255);
    
    // Draw score bar with explicit colors
    drawScoreBar();
    
    // Debug info
    fill(0);
    textSize(12);
    text('Game Running - FPS: ' + Math.round(frameRate()), 10, HEIGHT - 10);

    if (!gameOver) {
        // Update dino
        if (dino.isJumping) {
            dino.y += dino.velY;
            dino.velY += GRAVITY;
            
            if (dino.y >= HEIGHT - DINO_SIZE - 20) {
                dino.y = HEIGHT - DINO_SIZE - 20;
                dino.isJumping = false;
            }
        }

        // Update obstacle
        obstacle.x -= OBSTACLE_SPEED;
        if (obstacle.x < -OBSTACLE_WIDTH) {
            obstacle.x = WIDTH + 100;
            score++;
        }

        // Check collision
        if (checkCollision()) {
            gameOver = true;
        }
    }

    // Draw dino
    fill(0, 100, 255);
    rect(dino.x, dino.y, DINO_SIZE, DINO_SIZE);

    // Draw obstacle
    fill(0, 200, 0);
    triangle(
        obstacle.x + OBSTACLE_WIDTH/2, obstacle.y,
        obstacle.x + OBSTACLE_WIDTH, obstacle.y + OBSTACLE_HEIGHT,
        obstacle.x, obstacle.y + OBSTACLE_HEIGHT
    );

    // Draw game over screen
    if (gameOver) {
        drawGameOver();
    }
}

// Draw the score bar
function drawScoreBar() {
    // Background bar
    fill(0);
    rect(8, 8, WIDTH - 16, 24);
    
    // Score progress bar
    fill(255, 215, 0);
    let scoreWidth = min(score * 50, WIDTH - 20);
    rect(10, 10, scoreWidth, 20);
    
    // Score text
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(`Score: ${score}`, WIDTH/2, 20);
}

// Draw game over screen
function drawGameOver() {
    // Semi-transparent overlay
    fill(0, 0, 0, 128);
    rect(0, 0, WIDTH, HEIGHT);
    
    // Game Over text
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(48);
    text('GAME OVER', WIDTH/2, HEIGHT/2 - 30);
    
    // Final score
    fill(255);
    textSize(24);
    text(`Final Score: ${score}`, WIDTH/2, HEIGHT/2 + 20);
    text('Press SPACE/UP or Click to Try Again', WIDTH/2, HEIGHT/2 + 60);
}

// Check for collision between dino and obstacle
function checkCollision() {
    return (
        dino.x < obstacle.x + OBSTACLE_WIDTH &&
        dino.x + DINO_SIZE > obstacle.x &&
        dino.y < obstacle.y + OBSTACLE_HEIGHT &&
        dino.y + DINO_SIZE > obstacle.y
    );
}

// Handle keyboard input
function keyPressed() {
    if ((keyCode === 32 || keyCode === UP_ARROW)) { // Space or Up arrow
        if (gameOver) {
            resetGame();
        } else if (!dino.isJumping) {
            dino.isJumping = true;
            dino.velY = JUMP_STRENGTH;
        }
    }
}

// Handle mouse input
function mousePressed() {
    if (gameOver) {
        resetGame();
    } else if (!dino.isJumping) {
        dino.isJumping = true;
        dino.velY = JUMP_STRENGTH;
    }
}