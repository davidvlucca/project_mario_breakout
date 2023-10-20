class Player {
  constructor(gameScreen, left, top, width, height, imgSrc){
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    //Set up some default values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }
  move(){
    // Update player's car position based on direction
    this.left += this.directionX;
    this.top += this.directionY;

    // Right - Side
    if (this.left + this.width >= this.gameScreen.offsetWidth){
      this.left = this.gameScreen.offsetWidth - this.width;
    }
    // Left - Side
    else if (this.left <= 0) {
      this.left = 0;
  }

    // Bottom - Side
    if (this.top + this.height >= this.gameScreen.offsetHeight){
    this.top = this.gameScreen.offsetHeight - this.height;
    }
    // Top - Side
    else if (this.top <= 0) {
    this.top = 0;
    }

    this.updatePosition();
  }
  updatePosition (){

    // Update CSS
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle){
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    if(
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom>  obstacleRect.top
    ){
      return true;
    } else {
    return false;
    }
  }
}