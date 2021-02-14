import { EventEmitter } from 'events';

class Pawn extends EventEmitter {
  constructor (id) {
    super();
    this.id = id;
    this.container = document.querySelector(`.pawn.${id}`);
    this.occupied = false;
    this.state = null;

    this.newX = 0;
    this.newY = 0;
    this.oldX = 0;
    this.oldY = 0;

    this.container.addEventListener('mousedown', this.startMoveing);
    this.container.addEventListener('touchstart', this.startMoveingMobile);
  }

  startMoveing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.occupied === false){
      this.occupied = true;
      this.oldX = e.clientX;
      this.oldY = e.clientY;
      document.addEventListener('mouseup', this.stopMoveing);
      document.addEventListener('mousemove', this.move);
      this.sendOccupied();
    }
  }

  startMoveingMobile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.occupied === false){
      this.occupied = true;
      this.oldX = e.changedTouches[0].pageX;
      this.oldY = e.changedTouches[0].pageY;
      document.addEventListener('touchend', this.stopMoveingMobile);
      document.addEventListener('touchmove', this.moveMobile);
      this.sendOccupied();
    }
  }

    sendOccupied = () => {
      const message = {
        type: 'occupied',
        payload: {
          id: this.id,
          occupied: true
        }
      };
      const stringifiedMessage = JSON.stringify(message);
      this.emit('message', stringifiedMessage);
    }

  move = (e) => {
    e.preventDefault();
    this.newX = this.oldX - e.clientX;
    this.newY = this.oldY - e.clientY;
    this.oldX = e.clientX;
    this.oldY = e.clientY;
    const newTop = this.container.offsetTop - this.newY;
    const newLeft = this.container.offsetLeft - this.newX;
    this.clientUpdatePosition(newTop, newLeft);
  }

  moveMobile = (e) => {
    e.preventDefault();
    this.newX = this.oldX - e.changedTouches[0].pageX;
    this.newY = this.oldY - e.changedTouches[0].pageY;
    this.oldX = e.changedTouches[0].pageX;
    this.oldY = e.changedTouches[0].pageY;
    const newTop = this.container.offsetTop - this.newY;
    const newLeft = this.container.offsetLeft - this.newX;
    this.clientUpdatePosition(newTop, newLeft);
  }


  clientUpdatePosition = (newTop, newLeft) => {
    let topToUpdate = this.state.top;
    let leftToUpdate = this.state.left;
    if ((newTop >= 0) && (newTop <= 445)) {
      topToUpdate = (this.container.offsetTop - this.newY);
      }
      if ((newLeft >= 0) && (newLeft <= 250)) {
        leftToUpdate = (this.container.offsetLeft - this.newX);
      }
      this.updatePosition(topToUpdate, leftToUpdate);
      this.sendUpdatedPostion(topToUpdate, leftToUpdate);
  }

  updatePosition = (top, left) => {
    this.container.style.top = top + 'px';
    this.container.style.left = left + 'px';
  }

  sendUpdatedPostion = (top, left) => {
    const message = {
      type: 'position',
      payload: {
        id: this.id,
        top: top,
        left: left
      }
    }
    const stringifiedMessage = JSON.stringify(message);
    this.emit('message', stringifiedMessage);
  }

  stopMoveing = () => {
    document.removeEventListener('mouseup', this.stopMoveing);
    document.removeEventListener('mousemove', this.move);
    this.occupied = false;
    this.sendEndOccupied();
    this.serverUpdateState(this.state);
  }

  stopMoveingMobile = () => {
    document.removeEventListener('touchend', this.stopMoveingMobile);
    document.removeEventListener('touchmove', this.moveMobile);
    this.occupied = false;
    this.sendEndOccupied();
    this.serverUpdateState(this.state);
  }

  sendEndOccupied = () => {
    const message = {
      type: 'occupied',
      payload: {
        id: this.id,
        occupied: false
      }
    };
    const stringifiedMessage = JSON.stringify(message);
    this.emit('message', stringifiedMessage);
  }

  serverUpdateState = (newState) => {
      this.setState(newState);
      if(this.occupied === false){
        this.updatePosition(this.state.top, this.state.left);
      }
  }

  setState = (state) => {
    this.state = state;
  }
}

export default Pawn;
