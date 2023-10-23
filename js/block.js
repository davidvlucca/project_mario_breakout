class Block {
    constructor(xAxis, yAxis) {
      this.bottomLeft = [xAxis, yAxis];
      this.bottomRight = [xAxis + blockWidth, yAxis];
      this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
      this.topLeft = [xAxis, yAxis + blockHeight];
    }
  }
  