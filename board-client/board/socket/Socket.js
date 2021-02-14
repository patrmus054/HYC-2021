import { EventEmitter } from 'events';

class Socket extends EventEmitter {
  constructor () {
    super();
    this.socket = null;
    this.messageListener = null;
  }

  createConnection = () => {
    this.createConnection();
  }

  createConnection = () => {
    this.socket = new WebSocket('ws://localhost:8080');
    this.messageListener = this.socket.addEventListener('message', this.recivedMessage);
  }


  recivedMessage = (message) => {
    const parsedMessage = JSON.parse(message.data);
    this.emit('message', parsedMessage);
  }

  sendMessage = (message) => {
    this.socket.send(message);
  }

}
export default Socket;