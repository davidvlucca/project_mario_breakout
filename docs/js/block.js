class Block {
  constructor(gameScreen,xAxis,yAxis){
    this.gameScreen = gameScreen;
    this.blockWidth = 60;
    this.blockHeight = 60;
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + this.blockWidth, yAxis]
    this.topRight = [xAxis + this.blockWidth, yAxis + this.blockHeight]
    this.topLeft = [xAxis, yAxis + this.blockHeight]

    this.element = document.createElement("img");
    this.element.src = "/docs/images/mario-block2.gif";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.blockWidth}px`;
    this.element.style.height = `${this.blockHeight}px`;
    this.element.style.left = `${xAxis}px`;
    this.element.style.bottom = `${yAxis}px`;
    this.gameScreen.appendChild(this.element);
  }

  updatePosition(){
    this.element.style.bottom = `${yAxis}px`
    this.element.style.left = `${xAxis}px`
  }

}