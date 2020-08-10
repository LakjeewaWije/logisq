import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;

  constructor() { }

  setupSocketConnection() {
  return   this.socket = io('http://test.rightapps.net.au:3000/', {
      transports: ['websocket']
    });
    //
    // this.socket.on('update', msg => {
    //  console.log('Updated ', msg);
    // });
  }
}
