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
let dinoRunImage1;
let dinoRunImage2;
let dinoJumpImage;

// Base64 encoded dino images
const dinoRun1Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGJSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A+EPf9F3AV68AAAAAElFTkSuQmCC';

const dinoRun2Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

const dinoJumpBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

function preload() {
    console.log('Starting to load images...');
    dinoRunImage1 = loadImage(dinoRun1Base64);
    dinoRunImage2 = loadImage(dinoRun2Base64);
    dinoJumpImage = loadImage(dinoJumpBase64);
    console.log('Images loaded successfully');
}

function setup() {
    // Create and position the canvas
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
    imageMode(CENTER);
    
    // Initialize game objects
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
    
    if (!isGameOver) {
        updateGame();
    } else {
        showGameOver();
    }
    
    // Draw score
    fill(50);
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
    // Draw dino with animation
    push();
    translate(dino.x + DINO_SIZE/2, dino.y + DINO_SIZE/2);
    if (dino.isJumping) {
        image(dinoJumpImage, 0, 0, DINO_SIZE, DINO_SIZE);
    } else {
        if (frameCount % 10 === 0) {
            animationFrame = !animationFrame;
        }
        const currentImage = animationFrame ? dinoRunImage1 : dinoRunImage2;
        image(currentImage, 0, 0, DINO_SIZE, DINO_SIZE);
    }
    pop();
    
    // Draw obstacle
    fill(255, 0, 0);
    rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
}

function showGameOver() {
    textAlign(CENTER);
    fill(255, 0, 0);
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