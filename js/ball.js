class Ball {
    constructor(gameScreen, left, bottom, width, height, imgSrc){
    this.gameScreen = gameScreen;
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
    this.directionX = -2;
    this.directionY = 2;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.ballDiameter=20
    //Set up some default values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.bottom = `${bottom}px`;

    this.gameScreen.appendChild(this.element);

  }

  didCollideBlock(block){
    const ballRect = this.element.getBoundingClientRect();
    const blockRect = block.element.getBoundingClientRect();
    if(
      ballRect.left < blockRect.right &&
      ballRect.right > blockRect.left &&
      ballRect.top < blockRect.bottom &&
      ballRect.bottom>  blockRect.top
    ){
      this.changeDirectionBoxes()
      return true;
    } else {
    return false;
    }
  }
  didCollidePlayerWalls(player){
    const ballRect = this.element.getBoundingClientRect();
    const playerRect = player.element.getBoundingClientRect();
    if(
      ballRect.left < playerRect.right &&
      ballRect.right > playerRect.left &&
      ballRect.top < playerRect.bottom &&
      ballRect.bottom>  playerRect.top
    ){
      this.changeDirectionPlayer()
      return false;

    } else if (this.left >= parseInt(this.gameScreen.style.width,10) - this.ballDiameter ||
               this.left <= 0 ||
               this.bottom >= parseInt(this.gameScreen.style.height,10) - this.ballDiameter) {
      this.changeDirection()
      return false;
    }
      else if(this.bottom >= 538){
      this.changeDirectionTopWall()
        return false
    }

      else if(this.bottom <= 0) {
    return true;
    }
    return false

  }

  move(){
    // Update player's car position based on direction
    this.left += this.directionX;
    this.bottom += this.directionY;

    // Right - Side
    if (this.left + this.width >= this.gameScreen.offsetWidth){
      this.left = this.gameScreen.offsetWidth - this.width;
    }
    // Left - Side
    else if (this.left <= 0) {
      this.left = 0;
    }

    // Bottom - Side
    if (this.bottom + this.height >= this.gameScreen.offsetHeight){
      this.bottom = this.gameScreen.offsetHeight - this.height;
    }
    // Top - Side
    else if (this.bottom <= 0) {
      this.bottom = 0;
    }

    this.updatePosition();
  }
  updatePosition(){

    // Update CSS
    this.element.style.left = `${this.left}px`;
    this.element.style.bottom = `${this.bottom}px`;
  }


  changeDirection() {
  if (this.directionX === 2 && this.directionY === 2) {
    this.directionY = 2; this.directionX =-2;
    return;
  }
  if (this.directionX === 2 && this.directionY === -2) {
    this.directionX= -2;
    return;
  }
  if (this.directionX === -2 && this.directionY === -2) {
    this.directionY = -2; this.directionX = 2;

    return;
  }
  if (this.directionX === -2 && this.directionY === 2) {
    this.directionX = 2
    return;
   }
  }
  changeDirectionPlayer() {
    if (this.directionX === 2 && this.directionY === -2) {
      this.directionX= 2;this.directionY = 2;
      return;
    }
    if (this.directionX === -2 && this.directionY === -2) {
      this.directionY = 2; this.directionX = -2;

      return;
    }

    }
    changeDirectionBoxes() {
      if (this.directionX === 2 && this.directionY === 2) {
        this.directionY = -2;
        return;
      }
      if (this.directionX === 2 && this.directionY === -2) {
        this.directionX= -2;
        return;
      }
      if (this.directionX === -2 && this.directionY === -2) {
        this.directionY = -2; this.directionX = 2;

        return;
      }
      if (this.directionX === -2 && this.directionY === 2) {
        this.directionX = 2;
        return;
       }
      }

       changeDirectionTopWall(){
        if (this.directionX === 2 && this.directionY === 2) {
          this.directionX= 2;this.directionY = -2;
          return;
        }
        if (this.directionX === -2 && this.directionY === 2) {
          this.directionY = -2; this.directionX = 2;

          return;
        }

}

}
