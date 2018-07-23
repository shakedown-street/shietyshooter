export class Renderer {

  constructor(public ctx: any) {}

  public clear(x: number, y: number, w: number, h: number) {
    this.ctx.clearRect(x, y, w, h);
  }

  public rect(color: string, x: number, y: number, w: number, h: number) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  public circle(color: string, x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  public text(text: string, x: number, y: number, color = 'black', font = '16px Arial') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }

  public image(image: any, sX: number, sY: number, sW: number, sH: number,
               dX: number, dY: number, dW: number, dH: number) {
    this.ctx.drawImage(image, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  public hr(x: number, y: number, w: number, color = 'black', lineWidth = 1) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.stroke();
  }

  public line(x1: number, y1: number, x2: number, y2: number,  color = 'black', lineWidth = 1) {
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  public triangle(color: string, x: number, y: number, w: number, h: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w / 2, y + h);
    this.ctx.lineTo(x - w / 2, y + h);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}
