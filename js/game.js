class Game {
    // code to be added
    constructor (){
        this.startScreen = document.getElementById("game-intro"); // We using document.getElementById (can also be document.querySelector()) to access and hold the div #game-intro
        this.gameScreen = document.getElementById("game-screen"); // Holds the div element "game-screen"
        this.gameEndScreen = document.getElementById("game-end"); // Holds the div element "game-end"
        this.player = new Player(this.gameScreen,
        200, // Left
        500,
        90,
        150,
        "./images/car.png");
        this.height = 600; //The height of the game screen in pixels
        this.width = 500; //The width of the game screen in pixels
        this.obstacles=[];//An empty array. We'll use it to store the obstacle instances we create later
        this.score = 0; //A score increases every time an obstacle is passed. Set its initial value to 0
        this.lives = 3; //The number of remaining lives the player has. Set its initial value to 3
        this.gameIsOver = false; //A flag used to track whether the game is over. Set the initial value to false
        this.loadingObstacle = false;
    }
    start(){
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

        for (let i = 0; i < this.obstacles.length; i++){
            const obstacle = this.obstacles[i];
            obstacle.move();

            // Check for collision
            if (this.player.didCollide(obstacle)){
                obstacle.element.remove();
                this.obstacles.splice(i,1);
                this.lives --;
            }
            else if (obstacle.top > this.height){
                this.score ++;
                obstacle.element.remove();
                this.obstacles.splice(i,1);
            }
        }

        if (this.lives === 0){
            this.endGame();
        }

        if (!this.obstacles.length && !this.loadingObstacle){
            this.loadingObstacle = true;
            setTimeout(() => {
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.loadingObstacle = false;
            }, 500);
        }
        // This method is responsible for updating the game state during each loop iteration. For now, we will leave it empty and come back to implement it in the upcoming iterations.
        console.log("in the update");

          let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    endGame(){
        this.gameIsOver = true;
        this.player.element.remove();
        this.obstacles.forEach(obstacle=>{
            obstacle.element.remove();
            });
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
    }
}
