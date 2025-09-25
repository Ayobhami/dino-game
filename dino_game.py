import pygame
import random
import os

# Dino settings
dino_size = 50  # Size for the dino sprite
obstacle_width = 30
obstacle_height = 50
jump_strength = -15  # How high the dino jumps
initial_obstacle_distance = 800  # Start obstacle further away
obstacle_speed = 5  # Slower obstacle speed

# Load background imageandom
import os

# Initialize pygame
pygame.init()

# Screen
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Symbiotic Dino Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 100, 255)
GREEN = (0, 200, 0)
GOLD = (255, 215, 0)
RED = (255, 0, 0)

# Fonts
font = pygame.font.SysFont("Arial", 24)
large_font = pygame.font.SysFont("Arial", 48)

# Score bar settings
SCORE_BAR_HEIGHT = 20
SCORE_BAR_MARGIN = 10
MAX_SCORE_WIDTH = WIDTH - (SCORE_BAR_MARGIN * 2)

# Game settings
dino_size = 60  # Size for the dino sprite
obstacle_width = 40
obstacle_height = 60

# Load background image
try:
    background = pygame.image.load('assets/Untitled.png')
    background = pygame.transform.scale(background, (WIDTH, HEIGHT))
except pygame.error:
    print("Could not load background image. Make sure 'Untitled.png' is in the assets folder.")
    background = None

# Create simple shapes for dino and cactus
dino_surf = pygame.Surface((dino_size, dino_size), pygame.SRCALPHA)
pygame.draw.rect(dino_surf, (50, 150, 255), (0, 0, dino_size, dino_size))  # Blue dino
dino_img = dino_surf

cactus_surf = pygame.Surface((obstacle_width, obstacle_height), pygame.SRCALPHA)
pygame.draw.polygon(cactus_surf, (0, 200, 0), [  # Green cactus
    (obstacle_width/2, 0),  # Top point
    (obstacle_width, obstacle_height),  # Bottom right
    (0, obstacle_height)  # Bottom left
])
cactus_img = cactus_surf
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 100, 255)  # Bright blue color

# Clock
clock = pygame.time.Clock()
FPS = 60

# Dino settings
dino_size = 40
dino_x = 100
dino_y = HEIGHT - dino_size - 20
dino_vel_y = 0
gravity = 1
is_jumping = False

# Ensure obstacle starts far enough to the right

# Obstacle
obstacle_width = 20
obstacle_height = 40
obstacle_x = WIDTH + initial_obstacle_distance
obstacle_y = HEIGHT - obstacle_height - 20
obstacle_speed = obstacle_speed

# Game state
score = 0
game_over = False

def reset_game():
    global score, dino_y, dino_vel_y, is_jumping, obstacle_x, game_over
    score = 0
    dino_y = HEIGHT - dino_size - 20
    dino_vel_y = 0
    is_jumping = False
    obstacle_x = WIDTH + initial_obstacle_distance
    game_over = False

running = True
while running:
    if background:
        screen.blit(background, (0, 0))
    else:
        screen.fill(WHITE)

    # Events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        # Handle mouse clicks and touchpad
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if game_over:
                reset_game()
            elif not is_jumping:
                is_jumping = True
                dino_vel_y = jump_strength

    # Controls (keyboard)
    keys = pygame.key.get_pressed()
    if game_over:
        if keys[pygame.K_SPACE] or keys[pygame.K_UP]:
            reset_game()
    # Allow jumping with space bar or up arrow
    elif (keys[pygame.K_SPACE] or keys[pygame.K_UP]) and not is_jumping:
        is_jumping = True
        dino_vel_y = jump_strength

    # Dino movement
    if is_jumping:
        dino_y += dino_vel_y
        dino_vel_y += gravity
        if dino_y >= HEIGHT - dino_size - 20:
            dino_y = HEIGHT - dino_size - 20
            is_jumping = False

    # Obstacle movement
    obstacle_x -= obstacle_speed
    if obstacle_x < -obstacle_width:
        obstacle_x = WIDTH
        score += 1

    # Collision detection
    dino_rect = pygame.Rect(dino_x, dino_y, dino_size, dino_size)
    obstacle_rect = pygame.Rect(obstacle_x, obstacle_y, obstacle_width, obstacle_height)

    if dino_rect.colliderect(obstacle_rect) and not game_over:
        game_over = True

    # Draw Dino & Obstacle
    if dino_img:
        screen.blit(dino_img, dino_rect)
    else:
        pygame.draw.rect(screen, BLUE, dino_rect)  # Fallback if image not found
    
    if cactus_img:
        screen.blit(cactus_img, obstacle_rect)
    else:
        pygame.draw.rect(screen, (200, 0, 0), obstacle_rect)  # Fallback if image not found

    # Draw score bar
    # Background bar
    pygame.draw.rect(screen, BLACK, (SCORE_BAR_MARGIN - 2, SCORE_BAR_MARGIN - 2, 
                                   MAX_SCORE_WIDTH + 4, SCORE_BAR_HEIGHT + 4))
    
    # Score progress bar (grows with score)
    score_width = min((score * 50), MAX_SCORE_WIDTH)  # Each point adds 50 pixels, up to max width
    pygame.draw.rect(screen, GOLD, (SCORE_BAR_MARGIN, SCORE_BAR_MARGIN, 
                                  score_width, SCORE_BAR_HEIGHT))
    
    # Score text
    score_text = font.render(f"Score: {score}", True, BLACK)
    text_rect = score_text.get_rect()
    text_rect.centerx = WIDTH // 2
    text_rect.centery = SCORE_BAR_MARGIN + (SCORE_BAR_HEIGHT // 2)
    screen.blit(score_text, text_rect)

    # Draw game over screen
    if game_over:
        # Semi-transparent overlay
        overlay = pygame.Surface((WIDTH, HEIGHT))
        overlay.fill((0, 0, 0))
        overlay.set_alpha(128)
        screen.blit(overlay, (0, 0))

        # Game Over text
        game_over_text = large_font.render("GAME OVER", True, RED)
        text_rect = game_over_text.get_rect()
        text_rect.centerx = WIDTH // 2
        text_rect.centery = HEIGHT // 2 - 30
        screen.blit(game_over_text, text_rect)

        # Final score text
        final_score_text = font.render(f"Final Score: {score}", True, WHITE)
        text_rect = final_score_text.get_rect()
        text_rect.centerx = WIDTH // 2
        text_rect.centery = HEIGHT // 2 + 20
        screen.blit(final_score_text, text_rect)

        # Try again text
        try_again_text = font.render("Press SPACE/UP or Click to Try Again", True, WHITE)
        text_rect = try_again_text.get_rect()
        text_rect.centerx = WIDTH // 2
        text_rect.centery = HEIGHT // 2 + 60
        screen.blit(try_again_text, text_rect)

    # Update screen
    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
