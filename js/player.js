class Player {
  constructor(gameScreen, left, bottom, width, height, imgSrc){
    this.gameScreen = gameScreen;
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
    this.directionX = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    //Set up some default values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.bottom = `${bottom}px`;

    this.gameScreen.appendChild(this.element);
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
    this.updatePosition();
  }
  updatePosition (){

    // Update CSS
    this.element.style.left = `${this.left}px`;
  }


}