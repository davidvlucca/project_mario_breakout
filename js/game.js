  class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.scoreDisplay = document.querySelector('#score');
      this.gameIsOver = false;
      this.blockWidth = 60;
      this.blockHeight = 60;
      this.ballDiameter = 20;
      this.boardWidth = 420;
      this.boardHeight = 600;
      this.userWidth = 100;
      this.userHeight = 20;
      this.xDirection = -1;
      this.yDirection = 1;
  
      this.userStart = [210, 10];
      this.currentPosition = this.userStart;
  
      this.ballStart = [210, 80];
      this.ballCurrentPosition = this.ballStart;
  
      this.timerId = null;
      this.score = 0;
  
      this.blocks = [
        new Block(360,540),
        new Block(300, 540),
        new Block(240, 540),
        new Block(180, 540),
        new Block(120, 540),
        new Block(60, 540),
        new Block(0, 540),
        new Block(360,480),
        new Block(300, 480),
        new Block(240,480),
        new Block(180,480),
        new Block(120,480),
        new Block(60,480),
        new Block(0, 480),
        new Block(360,420),
        new Block(300,420 ),
        new Block(240,420),
        new Block(180,420),
        new Block(120,420),
        new Block(60,420),
        new Block(0,420),
        new Block(360,360),
        new Block(300,360),
        new Block(240,360),
        new Block(180,360),
        new Block(120,360),
        new Block(60,360),
        new Block(0, 360),
      
      ];
    }
    start() {
        // Set the height and width of the game screen
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
    
        // Hide the start screen
        this.startScreen.style.display = "none";
        
        // Show the game screen
        this.gameScreen.style.display = "block";
    
        // Start the game loop
        this.gameLoop();
      }
    
      gameLoop() {
        console.log("in the game loop");
    
        // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
        if (this.gameIsOver) {
          return;
        }
    
        this.update();
    
        window.requestAnimationFrame(() => this.gameLoop());
      }
      
    update() {
    console.log("in the update");
  }

  
    // Add blocks to the grid
    addBlocks() {
      for (let i = 0; i < this.blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = this.blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = this.blocks[i].bottomLeft[1] + 'px';
        this.grid.appendChild(block);
      }
    }
  
    // Add user element to the grid
    addUser() {
      this.user = document.createElement('div');
      this.user.classList.add('user');
      this.grid.appendChild(this.user);
      this.drawUser();
    }
  
    // Add ball element to the grid
    addBall() {
      this.ball = document.createElement('div');
      this.ball.classList.add('ball');
      this.grid.appendChild(this.ball);
      this.drawBall();
    }
  
    // Move the user based on keyboard input
    moveUser(e) {
      switch (e.key) {
        case 'ArrowLeft':
          if (this.currentPosition[0] > 0) {
            this.currentPosition[0] -= 10;
            this.drawUser();
          }
          break;
        case 'ArrowRight':
          if (this.currentPosition[0] < (this.boardWidth - this.userWidth)) {
            this.currentPosition[0] += 10;
            this.drawUser();
          }
          break;
      }
    }
  
    // Update the user's position in the grid
    drawUser() {
      this.user.style.left = this.currentPosition[0] + 'px';
      this.user.style.bottom = this.currentPosition[1] + 'px';
    }
  
    // Update the ball's position in the grid
    drawBall() {
      this.ball.style.left = this.ballCurrentPosition[0] + 'px';
      this.ball.style.bottom = this.ballCurrentPosition[1] + 'px';
    }
  
    // Move the ball and handle collisions
    moveBall() {
      this.ballCurrentPosition[0] += this.xDirection;
      this.ballCurrentPosition[1] += this.yDirection;
      this.drawBall();
      this.checkForCollisions();
    }
  
    // Check for collisions with blocks, walls, and user
    checkForCollisions() {
      // Check collisions with blocks
      for (let i = 0; i < this.blocks.length; i++) {
        const block = this.blocks[i];
  
        // Check if the ball's bounding box intersects with the block's bounding box
        if (
          this.ballCurrentPosition[0] + this.ballDiameter >= block.bottomLeft[0] &&
          this.ballCurrentPosition[0] <= block.bottomRight[0] &&
          this.ballCurrentPosition[1] + this.ballDiameter >= block.bottomLeft[1] &&
          this.ballCurrentPosition[1] <= block.topLeft[1]
        ) {
          // Reverse the direction of the ball
          this.xDirection = -this.xDirection;
          this.yDirection = -this.yDirection;
  
          // Remove the collided block from the array and update the score
          const allBlocks = Array.from(document.querySelectorAll('.block'));
          allBlocks[i].classList.remove('block');
          this.blocks.splice(i, 1);
          this.score++;
          this.scoreDisplay.innerHTML = this.score;
  
          // Check if all blocks are removed
          if (this.blocks.length === 0) {
            this.scoreDisplay.innerHTML = 'You Win!';
            clearInterval(this.timerId);
            document.removeEventListener('keydown', this.moveUser);
          }
        }
      }
         // check for wall hits
         if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
         {
           changeDirection()
         }
       
         //check for user collision
         if
         (
           (ballCurrentPosition[0] >= currentPosition[0] && ballCurrentPosition[0] <= currentPosition[0] + userWidth) &&
           (ballCurrentPosition[1] >= currentPosition[1] && ballCurrentPosition[1] <= currentPosition[1] + userHeight)
         )
        
         {
           changeDirection()
         }
       
         //game over
         if (ballCurrentPosition[1] <= 0) {
           clearInterval(timerId)
           scoreDisplay.innerHTML = 'You lose!'
           document.removeEventListener('keydown', moveUser)
         }
       }
  
     changeDirection() {
        if (xDirection === 1 && yDirection === 1) {
            yDirection = -1;
            return;
          }
          if (xDirection === 1 && yDirection === -1) {
            xDirection = -1;
            return;
          }
          if (xDirection === -1 && yDirection === -1) {
            yDirection = 1;
            return;
          }
          if (xDirection === -1 && yDirection === 1) {
            xDirection = 1;
            return;
          }
        }
  
    }
