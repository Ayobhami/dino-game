// Game constants// Game constants

const WIDTH = 800;const WIDTH = 800;

const HEIGHT = 400;const HEIGHT = 400;

const DINO_SIZE = 50;const DINO_SIZE = 50;

const OBSTACLE_WIDTH = 30;const OBSTACLE_WIDTH = 30;

const OBSTACLE_HEIGHT = 50;const OBSTACLE_HEIGHT = 50;

const BASE_SPEED = 5;const BASE_SPEED = 5;

const GRAVITY = 0.8;const GRAVITY = 0.8;

const JUMP_FORCE = -15;const JUMP_FORCE = -15;



// Game variables// Game variables

let dino;let dino;

let obstacle;let obstacle;

let score = 0;let score = 0;

let isGameOver = false;let isGameOver = false;

let animationFrame = 0;let animationFrame = 0;



// Image variables// Image variables

let backgroundImage;let dinoRunImage1;

let dinoRunImage1;let dinoRunImage2;

let dinoRunImage2;let dinoJumpImage;

let dinoJumpImage;

// Base64 encoded dino images

function preload() {const dinoRun1Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGJSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A+EPf9F3AV68AAAAAElFTkSuQmCC';

    console.log('Loading images...');

    // Load backgroundconst dinoRun2Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

    backgroundImage = loadImage('assets/Untitled.png');

    const dinoJumpBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

    // Load dino images

    dinoRunImage1 = loadImage('assets/dino-run1.png');function preload() {

    dinoRunImage2 = loadImage('assets/dino-run2.png');    console.log('Starting to load images...');

    dinoJumpImage = loadImage('assets/dino-jump.png');    dinoRunImage1 = loadImage(dinoRun1Base64);

    console.log('Images loaded');    dinoRunImage2 = loadImage(dinoRun2Base64);

}    dinoJumpImage = loadImage(dinoJumpBase64);

    console.log('Images loaded successfully');

function setup() {}

    // Create and position the canvas

    const canvas = createCanvas(WIDTH, HEIGHT);function setup() {

    canvas.parent('game-container');    // Create and position the canvas

        const canvas = createCanvas(WIDTH, HEIGHT);

    // Set image modes    canvas.parent('game-container');

    imageMode(CENTER);    imageMode(CENTER);

        

    // Initialize game    // Initialize game objects

    resetGame();    resetGame();

}}



function resetGame() {const dinoRun2Base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

    dino = {

        x: 100,const dinoJumpBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVFiF7ZexSgNBEIa/OSUQiUWwEUQQbAQrwUoQX8DKB7ASX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBAScsl+FndwxCN3l7vkcuAPU+zO7P6zs7OzC5mmaZqmaZrGEnYB51wJ2AAWgCHwCPTN7DUmOOdcDqgB60AJGACPQNvMPmJjp4qdc3ngAlgdM/0MHJjZS0RsDjgDqmOmn4C6mfVjYifdwATOgeUJ88vAhXMuNyXmCNieML8ENCKxk+4AMzsxs6/AJbBnZu0p4b/EAo1QbFQxUAXaZnYNvE+7vX8i+RZ458rArpk9AW3gzcxek8T+9wQKwCGwambF8CueAedm9p4kdtrLmCTKwDawCHwDPaBlZh+xQRm2bJqm+QvJt2DYzggNQk8uhN4Qmo+J7QM3wHsoKAe0nHPnzrliVGyS4+H2x5PTUP6vhs9ngJaZjSLulzlgy8z2nerWJ+BjwtwnsD/h5APQA+rOufmY2HHi4R8wD9SBdbLPaTd8dszsPTY209A0zR/0A1/qf8+Fg499AAAAAElFTkSuQmCC';

        y: HEIGHT - DINO_SIZE - 20,

        vy: 0,const cactusBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEpSURBVEiJ7ZWxSgNBEIa/WUshEotgI4ggpBGsBCvBShBfwMoHsBJfwMoHsBJfwM4HsBIrGxErQQTBRhBBsBFEEFLc7mfhBUKMd7mLEbjAH6bYndn/n52dnYObxsxiwA7QBHrAHXBtZh/eICLWgANgC1gGusAN0DKzz9jYzCZkCTgHPifMPQGnwEJE7BxwASxOmOsDx2b2HhObeQIAInIOVKbMV4EL51xuRswJsD9lfhVoxMaOKzCzupkNgUvgyMxaM8J/iQUaodjYYgfYB1pm1gY+Zj3eXxFuQa4IbJvZPdACBmb2GhL73xUUgDqwYWZL7le8CVya2XtI7KyXMYQysAusAENcx7fM7DM2KEPLJpPJ/IXwLei3e4QG3pMLvjeE5mNie8AN8O4DckDLOXfpnCtGxWYymYnxBempr5PQj8HcAAAAAElFTkSuQmCC';

        isJumping: false

    };const groundBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAYAAAB7wJiVAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAoSURBVFiF7dExAQAAAMKg9U9tCU8gAAAAAAAAAAAAAAAAAAAAAD4GKYAAAZkFcP0AAAAASUVORK5CYII=';

    

    obstacle = {const cloudBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAYAAADPym6aAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADRSURBVFiF7dexSgNBFIXh70wKkVgEG0EEwUawEqwE8QWsfAArX8DKB7ASX8DOB7ASKxsRK0EEwUYQQbARRBBCMvtZ7IBBiWSz2U0C+cEUs3fm/ufOnVkoisIppQQcA+dAAWwBH8CrmX0mgiilFPACbAIbQA94BNpmNk6N/TauAueAiHSAQzMbRAJ2gAdARDrAkZkNYwM/Q4ZARK6AvcSQe0BEroH9xJBZuQH0f/6fzGwSE7RoIcAucGtmL8Aw9uYLIUvAKXAAbAIfwDPQNbNRbGxRFEVRFEVR/Id+AJQMP69A8KC4AAAAAElFTkSuQmCC';

        x: WIDTH,

        y: HEIGHT - OBSTACLE_HEIGHT - 20function resetGame() {

    };    dino = {

            x: 100,

    score = 0;        y: HEIGHT - DINO_SIZE - 20,

    isGameOver = false;        vy: 0,

}        isJumping: false

    };

function draw() {    

    // Draw background    obstacle = {

    if (backgroundImage) {        x: WIDTH,

        // Scale the background to cover the canvas while maintaining aspect ratio        y: HEIGHT - OBSTACLE_HEIGHT - 20

        let bgScale = Math.max(WIDTH / backgroundImage.width, HEIGHT / backgroundImage.height);    };

        let scaledWidth = backgroundImage.width * bgScale;    

        let scaledHeight = backgroundImage.height * bgScale;    score = 0;

            isGameOver = false;

        // Center the background}

        let x = (WIDTH - scaledWidth) / 2;

        let y = (HEIGHT - scaledHeight) / 2;function draw() {

            // Clear background

        image(backgroundImage, x + scaledWidth/2, y + scaledHeight/2, scaledWidth, scaledHeight);    background(240);

    } else {    

        background(0);    if (!isGameOver) {

    }        updateGame();

        } else {

    if (!isGameOver) {        showGameOver();

        updateGame();    }

    } else {    

        showGameOver();    // Draw score

    }    fill(50);

        textSize(20);

    // Draw score    text('Score: ' + score, 20, 30);

    fill(255);}

    textSize(20);

    text('Score: ' + score, 20, 30);function updateGame() {

}    // Update dino

    if (dino.isJumping) {

function updateGame() {        dino.y += dino.vy;

    // Update dino        dino.vy += GRAVITY;

    if (dino.isJumping) {        

        dino.y += dino.vy;        if (dino.y >= HEIGHT - DINO_SIZE - 20) {

        dino.vy += GRAVITY;            dino.y = HEIGHT - DINO_SIZE - 20;

                    dino.isJumping = false;

        if (dino.y >= HEIGHT - DINO_SIZE - 20) {            dino.vy = 0;

            dino.y = HEIGHT - DINO_SIZE - 20;        }

            dino.isJumping = false;    }

            dino.vy = 0;    

        }    // Update obstacle

    }    obstacle.x -= BASE_SPEED;

        if (obstacle.x < -OBSTACLE_WIDTH) {

    // Update obstacle        obstacle.x = WIDTH;

    obstacle.x -= BASE_SPEED;        score++;

    if (obstacle.x < -OBSTACLE_WIDTH) {    }

        obstacle.x = WIDTH;    

        score++;    // Check collision

    }    if (checkCollision()) {

            isGameOver = true;

    // Check collision    }

    if (checkCollision()) {    

        isGameOver = true;    // Draw game elements

    }    drawGameElements();

    }

    // Draw game elements

    drawGameElements();function drawGameElements() {

}    // Draw dino with animation

    push();

function drawGameElements() {    translate(dino.x + DINO_SIZE/2, dino.y + DINO_SIZE/2);

    // Draw dino with animation    if (dino.isJumping) {

    push();        image(dinoJumpImage, 0, 0, DINO_SIZE, DINO_SIZE);

    translate(dino.x + DINO_SIZE/2, dino.y + DINO_SIZE/2);    } else {

            if (frameCount % 10 === 0) {

    if (dino.isJumping && dinoJumpImage) {            animationFrame = !animationFrame;

        image(dinoJumpImage, 0, 0, DINO_SIZE, DINO_SIZE);        }

    } else if (dinoRunImage1 && dinoRunImage2) {        const currentImage = animationFrame ? dinoRunImage1 : dinoRunImage2;

        if (frameCount % 10 === 0) {        image(currentImage, 0, 0, DINO_SIZE, DINO_SIZE);

            animationFrame = !animationFrame;    }

        }    pop();

        const currentImage = animationFrame ? dinoRunImage1 : dinoRunImage2;    

        image(currentImage, 0, 0, DINO_SIZE, DINO_SIZE);    // Draw obstacle

    } else {    fill(255, 0, 0);

        // Fallback if images aren't loaded    rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);

        fill(255);}

        rect(-DINO_SIZE/2, -DINO_SIZE/2, DINO_SIZE, DINO_SIZE);

    }function showGameOver() {

    pop();    textAlign(CENTER);

        fill(255, 0, 0);

    // Draw obstacle    textSize(32);

    push();    text('Game Over!', WIDTH/2, HEIGHT/2 - 40);

    fill(255, 0, 0);    textSize(24);

    rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);    text('Score: ' + score, WIDTH/2, HEIGHT/2);

    pop();    text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 40);

}}



function showGameOver() {function checkCollision() {

    drawGameElements();    return dino.x < obstacle.x + OBSTACLE_WIDTH &&

               dino.x + DINO_SIZE > obstacle.x &&

    textAlign(CENTER);           dino.y < obstacle.y + OBSTACLE_HEIGHT &&

    fill(255);           dino.y + DINO_SIZE > obstacle.y;

    textSize(32);}

    text('Game Over!', WIDTH/2, HEIGHT/2 - 40);

    textSize(24);function keyPressed() {

    text('Score: ' + score, WIDTH/2, HEIGHT/2);    if (key === ' ' || keyCode === UP_ARROW) {

    text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 40);        if (isGameOver) {

}            resetGame();

        } else if (!dino.isJumping) {

function checkCollision() {            dino.isJumping = true;

    return dino.x < obstacle.x + OBSTACLE_WIDTH &&            dino.vy = JUMP_FORCE;

           dino.x + DINO_SIZE > obstacle.x &&        }

           dino.y < obstacle.y + OBSTACLE_HEIGHT &&    }

           dino.y + DINO_SIZE > obstacle.y;}

}

function touchStarted() {

function keyPressed() {    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {

    if (key === ' ' || keyCode === UP_ARROW) {        if (isGameOver) {

        if (isGameOver) {            resetGame();

            resetGame();        } else if (!dino.isJumping) {

        } else if (!dino.isJumping) {            dino.isJumping = true;

            dino.isJumping = true;            dino.vy = JUMP_FORCE;

            dino.vy = JUMP_FORCE;        }

        }    }

    }    return false;

}}



function touchStarted() {function updateClouds() {

    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {    for (let i = clouds.length - 1; i >= 0; i--) {

        if (isGameOver) {        let cloud = clouds[i];

            resetGame();        cloud.x -= cloud.speed;

        } else if (!dino.isJumping) {        

            dino.isJumping = true;        if (cloud.x < -cloudImage.width * gameScale) {

            dino.vy = JUMP_FORCE;            clouds.splice(i, 1);

        }            continue;

    }        }

    return false;        

}        push();
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