// Game constants// Game constants

let WIDTH = 800;let WIDTH = 800;

let HEIGHT = 400;let HEIGHT = 400;

let DINO_SIZE = 50;let DINO_SIZE = 50;

let OBSTACLE_WIDTH = 30;let OBSTACLE_WIDTH = 30;

let OBSTACLE_HEIGHT = 50;let OBSTACLE_HEIGHT = 50;

let SPEED = 5;let SPEED = 5;

const GRAVITY = 0.8;const GRAVITY = 0.8;

let JUMP_FORCE = -15;let JUMP_FORCE = -15;



// Game scaling// Game scaling

let scale = 1;let scale = 1;

let isPortrait = false;let isPortrait = false;



// Game images// Game images

let dinoRunImage1;let dinoRunImage1;

let dinoRunImage2;let dinoRunImage2;

let dinoJumpImage;let dinoJumpImage;

let cactusImage;let cactusImage;

let groundImage;let groundImage;

let cloudImage;let cloudImage;

let currentDinoImage;let currentDinoImage;

let animationFrame = 0;let animationFrame = 0;



// Cloud variables// Game variables

let clouds = [];let dino;

let obstacle;

// Game variableslet score = 0;

let dino;let isGameOver = false;

let obstacle;

let score = 0;function updateGameDimensions() {

let isGameOver = false;    let containerWidth = document.getElementById('game-container').offsetWidth;

    let containerHeight = document.getElementById('game-container').offsetHeight;

function preload() {    

    // Load images    // Handle portrait mode

    dinoRunImage1 = loadImage('assets/dino-run1.png');    isPortrait = windowHeight > windowWidth;

    dinoRunImage2 = loadImage('assets/dino-run2.png');    if (isPortrait) {

    dinoJumpImage = loadImage('assets/dino-jump.png');        [containerWidth, containerHeight] = [containerHeight, containerWidth];

    cactusImage = loadImage('assets/cactus.png');    }

    groundImage = loadImage('assets/ground.png');

    cloudImage = loadImage('assets/cloud.png');    // Calculate scale based on container size

}    let scaleX = containerWidth / 800;

    let scaleY = containerHeight / 400;

function updateGameDimensions() {    scale = min(scaleX, scaleY) * 0.9; // 90% of the container

    let containerWidth = document.getElementById('game-container').offsetWidth;

    let containerHeight = document.getElementById('game-container').offsetHeight;    // Update game dimensions

        WIDTH = 800 * scale;

    // Handle portrait mode    HEIGHT = 400 * scale;

    isPortrait = windowHeight > windowWidth;    DINO_SIZE = 50 * scale;

    if (isPortrait) {    OBSTACLE_WIDTH = 30 * scale;

        [containerWidth, containerHeight] = [containerHeight, containerWidth];    OBSTACLE_HEIGHT = 50 * scale;

    }    SPEED = 5 * scale;

    JUMP_FORCE = -15 * scale;

    // Calculate scale based on container size}

    let scaleX = containerWidth / 800;

    let scaleY = containerHeight / 400;function preload() {

    scale = min(scaleX, scaleY) * 0.9; // 90% of the container    // Load images

    dinoRunImage1 = loadImage('assets/dino-run1.png');

    // Update game dimensions    dinoRunImage2 = loadImage('assets/dino-run2.png');

    WIDTH = 800 * scale;    dinoJumpImage = loadImage('assets/dino-jump.png');

    HEIGHT = 400 * scale;    cactusImage = loadImage('assets/cactus.png');

    DINO_SIZE = 50 * scale;    groundImage = loadImage('assets/ground.png');

    OBSTACLE_WIDTH = 30 * scale;    cloudImage = loadImage('assets/cloud.png');

    OBSTACLE_HEIGHT = 50 * scale;}

    SPEED = 5 * scale;

    JUMP_FORCE = -15 * scale;function setup() {

}    updateGameDimensions();

    const canvas = createCanvas(WIDTH, HEIGHT);

function setup() {    canvas.parent('game-container');

    updateGameDimensions();    

    const canvas = createCanvas(WIDTH, HEIGHT);    // Add mobile controls

    canvas.parent('game-container');    setupMobileControls();

        

    // Add mobile controls    // Set image properties

    setupMobileControls();    imageMode(CENTER);

        

    // Set image properties    // Initialize game

    imageMode(CENTER);    resetGame();

    }

    // Initialize game

    resetGame();function setupMobileControls() {

}    // Setup jump button

    let jumpButton = document.getElementById('jump-button');

function setupMobileControls() {    jumpButton.addEventListener('touchstart', function(e) {

    // Setup jump button        e.preventDefault();

    let jumpButton = document.getElementById('jump-button');        handleJump();

    jumpButton.addEventListener('touchstart', function(e) {    });

        e.preventDefault();

        handleJump();    // Handle orientation changes

    });    window.addEventListener('orientationchange', function() {

        setTimeout(windowResized, 100);

    // Handle orientation changes    });

    window.addEventListener('orientationchange', function() {}

        setTimeout(windowResized, 100);

    });function resetGame() {

}    dino = {

        x: 100,

function addCloud() {        y: HEIGHT - DINO_SIZE - 20,

    clouds.push({        vy: 0,

        x: WIDTH + cloudImage.width * scale,        isJumping: false

        y: random(50, HEIGHT/2),    };

        speed: random(1, 2) * scale    

    });    obstacle = {

}        x: WIDTH,

        y: HEIGHT - OBSTACLE_HEIGHT - 20

function resetGame() {    };

    dino = {    

        x: 100 * scale,    score = 0;

        y: HEIGHT - DINO_SIZE - 20 * scale,    isGameOver = false;

        vy: 0,}

        isJumping: false

    };function draw() {

        // Clear background

    obstacle = {    background(240);

        x: WIDTH,    

        y: HEIGHT - OBSTACLE_HEIGHT - 20 * scale    // Draw ground pattern

    };    let groundY = HEIGHT - 20;

        for (let x = 0; x < WIDTH; x += groundImage.width * scale) {

    clouds = [];        image(groundImage, x, groundY, groundImage.width * scale, 20 * scale);

    score = 0;    }

    isGameOver = false;    

        // Draw dino

    // Add initial cloud    fill(50, 150, 255);

    addCloud();    noStroke();

}    rect(dino.x, dino.y, DINO_SIZE, DINO_SIZE);

    

function draw() {    // Draw dino eye

    // Clear background    fill(255);

    background(240);    ellipse(dino.x + DINO_SIZE - 15, dino.y + 15, 10, 10);

        fill(0);

    // Update and draw clouds    ellipse(dino.x + DINO_SIZE - 15, dino.y + 15, 5, 5);

    updateClouds();    

        if (!isGameOver) {

    // Draw ground        // Update dino

    let groundY = HEIGHT - 20 * scale;        if (dino.isJumping) {

    for (let x = 0; x < WIDTH; x += groundImage.width * scale) {            dino.y += dino.vy;

        image(groundImage, x, groundY, groundImage.width * scale, 20 * scale);            dino.vy += GRAVITY;

    }            

                if (dino.y > HEIGHT - DINO_SIZE - 20) {

    if (!isGameOver) {                dino.y = HEIGHT - DINO_SIZE - 20;

        // Update game state                dino.isJumping = false;

        updateGame();                dino.vy = 0;

    } else {            }

        // Draw final state        }

        drawDino();        

        drawObstacle();        // Update obstacle

        showGameOver();        obstacle.x -= SPEED;

    }        if (obstacle.x < -OBSTACLE_WIDTH) {

                obstacle.x = WIDTH;

    // Always draw score            score++;

    drawScore();        }

}        

        // Draw obstacle

function updateClouds() {        fill(255, 100, 100);

    // Update and draw existing clouds        rect(obstacle.x, obstacle.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);

    for (let i = clouds.length - 1; i >= 0; i--) {        

        let cloud = clouds[i];        // Check collision

        cloud.x -= cloud.speed;        if (checkCollision()) {

                    isGameOver = true;

        // Remove clouds that are off screen        }

        if (cloud.x < -cloudImage.width * scale) {    } else {

            clouds.splice(i, 1);        // Game Over screen

            continue;        textSize(32);

        }        textAlign(CENTER);

                fill(255, 0, 0);

        // Draw cloud        text('Game Over!', WIDTH/2, HEIGHT/2);

        image(cloudImage, cloud.x, cloud.y,         text('Score: ' + score, WIDTH/2, HEIGHT/2 + 40);

              cloudImage.width * scale, cloudImage.height * scale);        text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 80);

    }    }

        

    // Add new cloud randomly    // Score display

    if (frameCount % 100 === 0 && random() < 0.3) {    fill(50);

        addCloud();    textSize(24);

    }    textAlign(LEFT);

}    text('Score: ' + score, 20, 30);

}

function updateGame() {

    // Update dinofunction checkCollision() {

    if (dino.isJumping) {    return dino.x < obstacle.x + OBSTACLE_WIDTH &&

        dino.y += dino.vy;           dino.x + DINO_SIZE > obstacle.x &&

        dino.vy += GRAVITY;           dino.y < obstacle.y + OBSTACLE_HEIGHT &&

                   dino.y + DINO_SIZE > obstacle.y;

        if (dino.y > HEIGHT - DINO_SIZE - 20 * scale) {}

            dino.y = HEIGHT - DINO_SIZE - 20 * scale;

            dino.isJumping = false;function handleJump() {

            dino.vy = 0;    if (isGameOver) {

        }        resetGame();

    }    } else if (!dino.isJumping) {

            dino.isJumping = true;

    // Update obstacle        dino.vy = JUMP_FORCE;

    obstacle.x -= SPEED;    }

    if (obstacle.x < -OBSTACLE_WIDTH) {}

        obstacle.x = WIDTH;

        score++;function keyPressed() {

    }    if (key === ' ' || keyCode === UP_ARROW) {

            handleJump();

    // Check collision    }

    if (checkCollision()) {}

        isGameOver = true;

    }function touchStarted() {

        // Only handle touch events on canvas

    // Draw game objects    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {

    drawDino();        handleJump();

    drawObstacle();    }

}    return false;

}

function drawDino() {

    // Update animation framefunction windowResized() {

    if (!dino.isJumping) {    updateGameDimensions();

        if (frameCount % 10 === 0) {    resizeCanvas(WIDTH, HEIGHT);

            animationFrame = !animationFrame;    

        }    // Adjust game object positions

        currentDinoImage = animationFrame ? dinoRunImage1 : dinoRunImage2;    if (dino) {

    } else {        dino.y = HEIGHT - DINO_SIZE - 20 * scale;

        currentDinoImage = dinoJumpImage;    }

    }    if (obstacle) {

            obstacle.y = HEIGHT - OBSTACLE_HEIGHT - 20 * scale;

    // Draw dino with current animation frame    }

    push();}
    imageMode(CENTER);
    image(currentDinoImage, 
          dino.x + DINO_SIZE/2, 
          dino.y + DINO_SIZE/2, 
          DINO_SIZE, 
          DINO_SIZE);
    pop();
}

function drawObstacle() {
    push();
    imageMode(CENTER);
    image(cactusImage,
          obstacle.x + OBSTACLE_WIDTH/2,
          obstacle.y + OBSTACLE_HEIGHT/2,
          OBSTACLE_WIDTH,
          OBSTACLE_HEIGHT);
    pop();
}

function drawScore() {
    fill(50);
    textSize(24 * scale);
    textAlign(LEFT);
    text('Score: ' + score, 20 * scale, 30 * scale);
}

function showGameOver() {
    textAlign(CENTER);
    fill(255, 0, 0);
    textSize(32 * scale);
    text('Game Over!', WIDTH/2, HEIGHT/2 - 40 * scale);
    textSize(24 * scale);
    text('Score: ' + score, WIDTH/2, HEIGHT/2);
    text('Press SPACE to restart', WIDTH/2, HEIGHT/2 + 40 * scale);
}

function checkCollision() {
    const dinoHitbox = {
        x: dino.x + DINO_SIZE * 0.2,
        y: dino.y + DINO_SIZE * 0.2,
        width: DINO_SIZE * 0.6,
        height: DINO_SIZE * 0.6
    };
    
    const obstacleHitbox = {
        x: obstacle.x + OBSTACLE_WIDTH * 0.2,
        y: obstacle.y + OBSTACLE_HEIGHT * 0.2,
        width: OBSTACLE_WIDTH * 0.6,
        height: OBSTACLE_HEIGHT * 0.6
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