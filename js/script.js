window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButtonLose = document.getElementById("restart-button-lose");
  const restartButtonWin = document.getElementById("restart-button-win");
  const nextLevel = document.getElementById("next-level")
  let game; // added

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButtonLose.addEventListener("click", function () {
    restartGame();
  })
  restartButtonWin.addEventListener("click", function () {
    restartGame();
  })
  nextLevel.addEventListener("click", function () {
    goNextLevel();
  })
  function restartGame() {
    location.reload();
  }
  function goNextLevel() {
    game = new Game();
    game.start();
    this.youWin = document.getElementById("you-win");
    this.youWin.style.display = "none";
  }
  function startGame() {
    // When the Start Game button is clicked, inside the startGame function we should create a new instance of the Game class and start the game by invoking the start() method
    game = new Game();
    game.start();
  }

  // Function that handles keys events
  function handleKeydown(event) {
    const key = event.key

    const possibleKeys = [
      "ArrowLeft",
      "ArrowRight",
    ]

      if (possibleKeys.includes(key)){
        event.preventDefault();

        if (game){
          switch(key){
            case 'ArrowLeft':
            game.player.directionX = -3;break;
            case 'ArrowRight':
            game.player.directionX = 3;break;
          }
        }
      }
  }

function handleKeyup(event) {
    const key = event.key

    const possibleKeys = [
      "ArrowLeft",
      "ArrowRight",
    ]

      if (possibleKeys.includes(key)){
        event.preventDefault();

        if (game){
          switch(key){
            case 'ArrowLeft':
            game.player.directionX = 0;break;

            case 'ArrowRight':
            game.player.directionX = 0;break;

          }
        }
      }
  }
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);



};
