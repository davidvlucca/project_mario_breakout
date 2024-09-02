class Ball {
  constructor(gameScreen, left, bottom, width, height, imgSrc){
  this.gameScreen = gameScreen;
  this.left = left;
  this.bottom = bottom;
  this.width = width;
  this.height = height;
  this.imgSrc = imgSrc;
  this.speed = 2;
  this.directionX = -this.speed;
  this.directionY = this.speed;
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

didCollideBlock(block){
  const ballRect = this.element.getBoundingClientRect();
  const blockRect = block.element.getBoundingClientRect();
  if( ballRect.left < blockRect.right &&
      ballRect.right > blockRect.left &&
      ballRect.top < blockRect.bottom &&
      ballRect.bottom>  blockRect.top
  ){		
  // Checking which side it collided with
  const dx = (ballRect.left + ballRect.width / 2) - (blockRect.left + blockRect.width / 2);
  const dy = (ballRect.top + ballRect.height / 2) - (blockRect.top + blockRect.height / 2);

    if (Math.abs(dx) > Math.abs(dy)) {
  this.changeDirectionBoxes(true)
    } else {
  this.changeDirectionBoxes(false)
    }
    return true;
  } 
else {
    return false;
  }
}
didCollidePlayerWalls(player){
  const ballRect = this.element.getBoundingClientRect();
  const playerRect = player.element.getBoundingClientRect();
  if( ballRect.left < playerRect.right &&
  ballRect.right > playerRect.left &&
  ballRect.top < playerRect.bottom &&
  ballRect.bottom>  playerRect.top
  ){
  // Checking which side of the player it collided with
  if(ballRect.right - playerRect.left<= player.width / 2 ){
  this.changeDirectionPlayer(true);
  }
  else{
  this.changeDirectionPlayer(false);
  }
    return false;
  }
  //Checking if Ball collied with top wall
  else if(this.bottom >=538){
  this.changeDirectionTopWall();
  return false;
  }  
    
  else if(this.bottom <= 0) {
  return true;
  }
  //Checking if Ball collied with side wall
  else if (this.left >= parseInt(this.gameScreen.style.width,10) - this.ballDiameter ||
           this.left <= 0) {
    this.changeDirectionSideWall()
    return false;
  }
  return false;
  
}

changeDirectionSideWall(){
this.directionX = -this.directionX;
} 
changeDirectionTopWall(){
this.directionY = -this.speed;
}
changeDirectionPlayer(leftSide){
this.directionY = this. speed;
this.directionX = leftSide ? -this.speed : this.speed;
}  
changeDirectionBoxes(side) {
  if(side){
  this.directionX = -this.directionX;   
}
else{
  this.directionY = -this.directionY;  
}
} 
}

