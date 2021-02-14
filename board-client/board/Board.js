import { EventEmitter } from 'events';
import Socket from './socket/Socket';
import Pawns from './pawns/Pawns';

class Board extends EventEmitter {
  constructor () {
    super();
    this.socket = null;
    this.pawns = null;
    this.init();
  }

  init = () => {
    this.socket = new Socket();
    this.pawns = new Pawns();
    this.setEventHandlers();
    this.socket.createConnection();
  }

  setEventHandlers = () => {
    this.socket.on('message', (message) => {
      this.pawns.receivedMessage(message);
    });

    this.pawns.on('message', (message) => {
      this.socket.sendMessage(message);
    });
  }
}

export default Board;
