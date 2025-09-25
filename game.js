// Game constants
let WIDTH = 800;
let HEIGHT = 400;
let DINO_SIZE = 50;
let OBSTACLE_WIDTH = 30;
let OBSTACLE_HEIGHT = 50;
let SPEED = 5;
const GRAVITY = 0.8;
let JUMP_FORCE = -15;

// Game scaling
let scale = 1;
let isPortrait = false;

// Game variables
let dino;
let obstacle;
let score = 0;
let isGameOver = false;

function updateGameDimensions() {
    let containerWidth = document.getElementById('game-container').offsetWidth;
    let containerHeight = document.getElementById('game-container').offsetHeight;
    
    // Handle portrait mode
    isPortrait = windowHeight > windowWidth;
    if (isPortrait) {
        [containerWidth, containerHeight] = [containerHeight, containerWidth];
    }

    // Calculate scale based on container size
    let scaleX = containerWidth / 800;
    let scaleY = containerHeight / 400;
    scale = min(scaleX, scaleY) * 0.9; // 90% of the container

    // Update game dimensions
    WIDTH = 800 * scale;
    HEIGHT = 400 * scale;
    DINO_SIZE = 50 * scale;
    OBSTACLE_WIDTH = 30 * scale;
    OBSTACLE_HEIGHT = 50 * scale;
    SPEED = 5 * scale;
    JUMP_FORCE = -15 * scale;
}

function setup() {
    updateGameDimensions();
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
    
    // Add mobile controls
    setupMobileControls();
    
    // Initialize game
    resetGame();
}

function setupMobileControls() {
    // Setup jump button
    let jumpButton = document.getElementById('jump-button');
    jumpButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleJump();
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(windowResized, 100);
    });
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

function handleJump() {
    if (isGameOver) {
        resetGame();
    } else if (!dino.isJumping) {
        dino.isJumping = true;
        dino.vy = JUMP_FORCE;
    }
}

function keyPressed() {
    if (key === ' ' || keyCode === UP_ARROW) {
        handleJump();
    }
}

function touchStarted() {
    // Only handle touch events on canvas
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        handleJump();
    }
    return false;
}

function windowResized() {
    updateGameDimensions();
    resizeCanvas(WIDTH, HEIGHT);
    
    // Adjust game object positions
    if (dino) {
        dino.y = HEIGHT - DINO_SIZE - 20 * scale;
    }
    if (obstacle) {
        obstacle.y = HEIGHT - OBSTACLE_HEIGHT - 20 * scale;
    }
}