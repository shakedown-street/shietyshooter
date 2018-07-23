import { Renderer } from './';

export class AnimationDef {

  public animations: any = {};
  private sheet: any;

  constructor() {
    this.sheet = new Image();
    this.sheet.onload = () => {};
    this.sheet.src = this.getImageUrl();
  }

  public getImageUrl(): any { return undefined; }

  private getFrame(animationName: string, frameNumber: number, direction: number) {
    let frames = this.animations[animationName]["frames"];
    return frames.find((frame: any) => {
      return frame[0] === frameNumber && frame[1] === direction;
    });
  }

  public render(r: Renderer, animationName: string, frameNumber: number, direction: number, x: number, y: number) {
    if (!this.sheet) {
      return;
    }
    let frame = this.getFrame(animationName, frameNumber, direction);
    let sheet_x = frame[2];
    let sheet_y = frame[3];
    let w = frame[4];
    let h = frame[5];
    let offset_x = frame[6];
    let offset_y = frame[7];
    r.image(this.sheet, sheet_x, sheet_y, w, h, x - offset_x, y - offset_y, w, h);
  }
}
