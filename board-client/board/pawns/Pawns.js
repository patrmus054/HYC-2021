import { EventEmitter } from 'events';
import Pawn from './pawn/Pawn';

class Pawns extends EventEmitter {
  constructor () {
    super();
    this.pawnsId = ['circle', 'triangle', 'square', 'pane'];
    this.pawns = new Map();
    this.init();
  }

  init = () => {
      this.createPawns();
  }

  createPawns = () => {
    this.pawnsId.forEach(id => {
        const newPawn = new Pawn(id);
        newPawn.on('message', this.emitMessage);
        this.pawns.set(id, newPawn);
    });
  }

  emitMessage = (message) => {
    this.emit('message', message);
  }

  receivedMessage = (message) => {
    this.pawnsId.forEach(id => {
        this.pawns.get(id).serverUpdateState(message[id]);
    });
  }

  sendMessage = (message) => {

  }
}

export default Pawns;
