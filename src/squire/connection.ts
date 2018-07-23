export class Connection {

  public socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }
}
