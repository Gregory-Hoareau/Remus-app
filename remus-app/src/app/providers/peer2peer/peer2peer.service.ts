import { Injectable } from '@angular/core';
import Peer, { DataConnection } from 'peerjs';
import { PlayersService } from '../players/players.service';
import { Player } from 'src/app/models/player.models';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class Peer2peerService {

  peer: Peer;
  // Host peerServer info
  host = '51.210.101.240';
  path = '/remus-app';
  port = 9000;

  constructor(public playerServ: PlayersService) { 

  }

  newpeer(id: string = undefined): Peer {
    this.peer = new Peer(id,
      {host: this.host,
      path: this.path,
      port: this.port,
      debug: 2});
    return this.peer;
  }

  openPeer(callback : Function, params = undefined) {
    this.peer.on('open', (id) => {
      console.log('peer', this.peer, 'opened');
      callback(params);
    })
  }

  closePeer(callback: Function, params = undefined) {
    this.peer.on('close', () => {
      callback(params);
    });
  }

  connectPeer(callback: Function, params = undefined) {
    this.peer.on('connection', (conn) => {
      callback(conn, params);
    });
  }

  errorPeer(message: string, callback: Function, params = undefined) {
    this.peer.on('error', (err) => {
      if (err.type === message) 
        callback(params, err);
    });
  }

  openConnection(conn:DataConnection, callback : Function, params = undefined) {
    conn.on('open', () => {
      console.log('connection', conn.peer, 'opened');
      callback(params);
    })
  }

  newConnection(id, options= {serialization: 'json'}): DataConnection {
    console.log("trying to connect to ", id);
    return this.peer.connect(id, options);
  }

  addConnectionAction(conn:DataConnection ,callback: Function, params = undefined) {
    conn.on('data', (data) => {
      callback(data,conn,params);
    })
  }
  
  closeConnection(conn:DataConnection ,callback: Function, params = undefined) {
    conn.on('close', () => {
      callback(params);
    })
  }

  shutDown() {
    this.playerServ.getConns().forEach((con)=>{
      con.close()
    });
    this.peer.disconnect();
    this.peer.destroy();
  }

  rejoin() {
    this.peer.reconnect();
  }

  myId() {
    return this.peer.id;
  }

  async sendMessage(content: Message) {
    console.log("sending ", content)
    content.target.conn.send({message:content.message});
    if(!this.playerServ.isHost)
      this.playerServ.getPlayerByName("Host").conn.send({message:content.message,target:content.target.name})
    this.playerServ.getConv(content.target).addMessage(content);
  }

}
