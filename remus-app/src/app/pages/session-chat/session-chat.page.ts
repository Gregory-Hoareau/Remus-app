import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player.models';
import { Conversation } from 'src/app/models/conversation.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayersService } from 'src/app/providers/players/players.service';
import { ModalController, IonContent } from '@ionic/angular';
import { Message } from 'src/app/models/message.model';
import { Peer2peerService } from 'src/app/providers/peer2peer/peer2peer.service';

@Component({
  selector: 'app-session-chat',
  templateUrl: './session-chat.page.html',
  styleUrls: ['./session-chat.page.scss'],
})
export class SessionChatPage implements OnInit {

  myForm : FormGroup;
  @ViewChild(IonContent,null) content: IonContent;
  @Input() target: Player;
  @Input() player: Player;
  //@Input() peerService: Peer2peerService;

  constructor(private formBuilder: FormBuilder, private playerServ: PlayersService,
    private modalController: ModalController) {
    this.target = new Player(undefined)
    this.player = new Player(undefined)
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {    
    this.myForm = this.formBuilder.group({
        message: null
    })
    setTimeout(() => {  this.content.scrollToBottom(0) }, 100);
  }


  async send() {
    const message = this.myForm.getRawValue().message
    this.myForm.reset()
    console.log("sending ", message, "to player ", this.target)
    this.target.conn.send({message:message});
    if(!this.playerServ.isHost)
      this.playerServ.getPlayerByName("host").conn.send({message:message,target:this.target.name})
    this.playerServ.getConv(this.target).addMessage(new Message(new Date(),this.playerServ.me(),message, this.target));
    setTimeout(() => {  this.content.scrollToBottom(100) }, 100);
    this.getFilteredConv();
  }

  getFilteredConv(): Conversation{
    let filteredConv:Conversation = new Conversation();
    this.playerServ.playersList.forEach(player => {
      //console.log("Conv avec ", player.name, this.playerServ.getConv(player));
      if(this.playerServ.getConv(player))
        filteredConv = filteredConv.concat(this.playerServ.getConv(player)) as Conversation;
    });
    filteredConv = filteredConv.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    //console.log("Conversations : ", filteredConv);
    return filteredConv.filter(message => 
      (message.target==this.target /*&&  message.player==this.player*/)
      || (/*message.target==this.player &&*/ message.player==this.target)) as Conversation;
  }

  changeTarget(event)  {
    console.log(event.target.value)
    this.target=event.target.value;
  }

  changePlayer(event)  {
    console.log(event.target.player)
    this.player=event.target.player;
  }

}
