window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const nextLevel = document.getElementById("next-level")
  let game; // added

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
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
