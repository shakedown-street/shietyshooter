export class Event {

  /*
  * zIndex - The order this event will be fired (lowest executing first)
  */
  constructor(public zIndex: number) {}

  public handleEvent(event: any, stateCtx: any) {}
}
