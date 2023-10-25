class Game {
    // code to be added
    constructor (){
        this.startScreen = document.getElementById("game-intro"); // We using document.getElementById (can also be document.querySelector()) to access and hold the div #game-intro
        this.gameScreen = document.getElementById("game-screen"); // Holds the div element "game-screen"
        this.gameEndScreen = document.getElementById("game-end"); // Holds the div element "game-end"
        this.youWin = document.getElementById("you-win");
        this.player = new Player(this.gameScreen,
        210, // Left
        10,
        100,
        20,
        "./images/car.png");
        this.ball = new Ball(this.gameScreen,
        210, // Left
        80,
        20,
        20,
        "./images/ball.png");
        this.height = 560; //The height of the game screen in pixels
        this.width = 360; //The width of the game screen in pixels
        this.blocks=[];//An empty array. We'll use it to store the obstacle instances we create later
        this.score = 0; //A score increases every time an obstacle is passed. Set its initial value to 0
        /*this.lives = 3; */ //The number of remaining lives the player has. Set its initial value to 3
        this.gameIsOver = false; //A flag used to track whether the game is over. Set the initial value to false
        this.loadingObstacle = false;
        this.blocks = [] ;

    }

    start(){
        // Set the height and width of the game screen
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.addBlocks();
        // Hide the start screen
        this.startScreen.style.display = "none";
        // Show the game screen
        this.gameScreen.style.display = "block";
        // Start the game loop
        this.gameLoop();
    }
    addBlocks() {
        for(let i = 0; i < 6; i++){
            for(let l = 0; l < 4; l++){
                if (l === 3){
                this.blocks.push(new Block(this.gameScreen, (i * 60), (l * 45 + 360)));
                }
                else if(l===2){
                    this.blocks.push(new Block(this.gameScreen, (i * 60), (l * 40 + 360)));
                }
                else if(l===1){
                    this.blocks.push(new Block(this.gameScreen, (i * 60), (l * 25 + 360)));
                }
                else {
                    this.blocks.push(new Block(this.gameScreen, (i * 60), (330)));
                }
            }
        }
    }

    gameLoop(){
        // Runs the game loop by executing the following steps:
        console.log("in the game loop");
        // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
        if(this.gameIsOver) {
            return;
        }
        // Update all objects on the game screen
        // Invokes the update() method to update the game state. We will create a update method in the following iteration.
        this.update();
        // To ensure that the game loop function runs repeatedly, it should invoke itself (like this.gameLoop()), to create a recursive loop. To ensure a consistent frame rate, use window.requestAnimationFrame() to execute the function.
       window.requestAnimationFrame(()=>this.gameLoop());
    }
    update(){
        this.player.move();
        this.ball.move()
        for (let i = 0; i < this.blocks.length; i++){
            const block = this.blocks[i];

            // Check for collision
            if (this.ball.didCollideBlock(block)){
                block.element.remove();
                this.blocks.splice(i,1);
                this.score ++;
                break;
            }

        }
        if (this.blocks.length === 0) {
            this.youWinScreen();
        }
        if(this.ball.didCollidePlayerWalls(this.player)){
            this.endGame();
        };
        // This method is responsible for updating the game state during each loop iteration. For now, we will leave it empty and come back to implement it in the upcoming iterations.
        console.log("in the update");
          let score = document.getElementById("score");
/*         let lives = document.getElementById("lives"); */
        score.innerHTML = this.score;
/*         lives.innerHTML = this.lives; */
    }

    endGame(){
        this.gameIsOver = true;
        this.player.element.remove();
        this.ball.element.remove();
        this.blocks.forEach(block=>{
            block.element.remove();
            });
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
    }
    youWinScreen    (){
        this.gameIsOver = true;
        this.player.element.remove();
        this.ball.element.remove();
        this.blocks.forEach(block=>{
            block.element.remove();
            });
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "none";
        this.youWin.style.display = "block";
    }
}