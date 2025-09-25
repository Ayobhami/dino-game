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

function setup() {
    // Create and position the canvas
    const canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('game-container');
    
    // Initialize game objects
    resetGame();
}

const dinoRun2Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

const dinoJumpBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

const cactusBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEpSURBVEiJ7ZWxSgNBEIa/WUshEotgI4ggpBGsBCvBShBfwMoHsBJfwMoHsBJfwM4HsBIrGxErQQTBRhBBsBFEEFLc7mfhBUKMd7mLEbjAH6bYndn/n52dnYObxsxiwA7QBHrAHXBtZh/eICLWgANgC1gGusAN0DKzz9jYzCZkCTgHPifMPQGnwEJE7BxwASxOmOsDx2b2HhObeQIAInIOVKbMV4EL51xuRswJsD9lfhVoxMaOKzCzupkNgUvgyMxaM8J/iQUaodjYYgfYB1pm1gY+Zj3eXxFuQa4IbJvZPdACBmb2GhL73xUUgDqwYWZL7le8CVya2XtI7KyXMYQysAusAENcx7fM7DM2KEPLJpPJ/IXwLei3e4QG3pMLvjeE5mNie8AN8O4DckDLOXfpnCtGxWYymYnxBempr5PQj8HcAAAAAElFTkSuQmCC';

const groundBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAYAAAB7wJiVAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAoSURBVFiF7dExAQAAAMKg9U9tCU8gAAAAAAAAAAAAAAAAAAAAAD4GKYAAAZkFcP0AAAAASUVORK5CYII=';

const cloudBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAYAAADPym6aAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADRSURBVFiF7dexSgNBFIXh70wKkVgEG0EEwUawEqwE8QWsfAArX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBBCMvtZ7IBBiWSz2U0C+cEUs3fm/ufOnVkoisIppQQcA+dAAWwBH8CrmX0mgiilFPACbAIbQA94BNpmNk6N/TauAueAiHSAQzMbRAJ2gAdARDrAkZkNYwM/Q4ZARK6AvcSQe0BEroH9xJBZuQH0f/6fzGwSE7RoIcAucGtmL8Aw9uYLIUvAKXAAbAIfwDPQNbNRbGxRFEVRFEVR/Id+AJQMP69A8KC4AAAAAElFTkSuQmCC';

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
    // Draw dino
    fill(50);
    rect(dino.x, dino.y, DINO_SIZE, DINO_SIZE);
    
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

function updateClouds() {
    for (let i = clouds.length - 1; i >= 0; i--) {
        let cloud = clouds[i];
        cloud.x -= cloud.speed;
        
        if (cloud.x < -cloudImage.width * gameScale) {
            clouds.splice(i, 1);
            continue;
        }
        
        push();
        translate(cloud.x / gameScale, cloud.y / gameScale);
        image(cloudImage, 0, 0, cloudImage.width, cloudImage.height);
        pop();
    }
    
    if (frameCount % 100 === 0 && random() < 0.3) {
        addCloud();
    }
}

function drawGround() {
    const groundWidth = groundImage.width;
    const groundY = HEIGHT - 20;
    
    for (let x = 0; x < WIDTH; x += groundWidth) {
        image(groundImage, x + groundWidth/2, groundY + 10, groundWidth, 20);
    }
}

function updateGame() {
    // Update dino
    if (dino.isJumping) {
        dino.y += dino.vy * gameScale;
        dino.vy += GRAVITY;
        
        if (dino.y >= (HEIGHT - DINO_SIZE - 20) * gameScale) {
            dino.y = (HEIGHT - DINO_SIZE - 20) * gameScale;
            dino.isJumping = false;
            dino.vy = 0;
        }
    }
    
    // Update obstacle
    obstacle.x -= speed;
    if (obstacle.x < -OBSTACLE_WIDTH * gameScale) {
        obstacle.x = WIDTH * gameScale;
        score++;
    }
    
    // Check collision
    if (checkCollision()) {
        isGameOver = true;
    }
    
    drawGameElements();
}

function drawGameElements() {
    // Draw dino with corrected scaling
    push();
    translate(dino.x / gameScale, dino.y / gameScale);
    imageMode(CENTER);
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
    
    // Draw obstacle with corrected scaling
    push();
    translate(obstacle.x / gameScale, obstacle.y / gameScale);
    imageMode(CENTER);
    image(cactusImage, 0, 0, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
    pop();
}

function drawScore() {
    push();
    scale(1/gameScale);
    fill(50);
    textSize(24);
    textAlign(LEFT);
    text('Score: ' + score, 20, 30);
    pop();
}

function showGameOver() {
    push();
    scale(1/gameScale);
    textAlign(CENTER);
    fill(255, 0, 0);
    textSize(32);
    text('Game Over!', WIDTH/2, HEIGHT/2 - 40);
    textSize(24);
    text('Score: ' + score, WIDTH/2, HEIGHT/2);
    text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 40);
    pop();
}

function checkCollision() {
    const dinoHitbox = {
        x: dino.x + DINO_SIZE * 0.2 * gameScale,
        y: dino.y + DINO_SIZE * 0.2 * gameScale,
        width: DINO_SIZE * 0.6 * gameScale,
        height: DINO_SIZE * 0.6 * gameScale
    };
    
    const obstacleHitbox = {
        x: obstacle.x + OBSTACLE_WIDTH * 0.2 * gameScale,
        y: obstacle.y + OBSTACLE_HEIGHT * 0.2 * gameScale,
        width: OBSTACLE_WIDTH * 0.6 * gameScale,
        height: OBSTACLE_HEIGHT * 0.6 * gameScale
    };
    
    return dinoHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
           dinoHitbox.x + dinoHitbox.width > obstacleHitbox.x &&
           dinoHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
           dinoHitbox.y + dinoHitbox.height > obstacleHitbox.y;
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
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        handleJump();
    }
    return false;
}

function windowResized() {
    updateGameDimensions();
    resizeCanvas(WIDTH * gameScale, HEIGHT * gameScale);
    
    if (dino) {
        dino.y = (HEIGHT - DINO_SIZE - 20) * gameScale;
    }
    if (obstacle) {
        obstacle.y = (HEIGHT - OBSTACLE_HEIGHT - 20) * gameScale;
    }
}