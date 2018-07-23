import { Event, Renderer, SquireGame } from './';

export abstract class State {

  constructor(public gameCtx: any) {}

  public abstract init(): void;

  public abstract render(r: Renderer): void;

  public abstract update(dt: number): void;

  public abstract end(): void;

}
