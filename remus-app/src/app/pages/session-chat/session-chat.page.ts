import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player.models';
import { Conversation } from 'src/app/models/conversation.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayersService } from 'src/app/providers/players/players.service';
import { ModalController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-session-chat',
  templateUrl: './session-chat.page.html',
  styleUrls: ['./session-chat.page.scss'],
})
export class SessionChatPage implements OnInit {

  myForm : FormGroup;
  @ViewChild(IonContent,null) content: IonContent;
  @Input() player: Player;
  @Input() conv: Conversation;

  constructor(private formBuilder: FormBuilder, private playerServ: PlayersService) {
    this.player = {
      name: '',
      conn: undefined
    }
    this.conv = {
      messages: []
    }
  }

  ngOnInit() {    
    this.myForm = this.formBuilder.group({
        message: null
    })
    setTimeout(() => {  this.content.scrollToBottom(0) }, 100);
  }


  async send() {
    console.table(this.myForm.getRawValue())
    const message = this.myForm.getRawValue().message
    this.myForm.reset()
    console.log("sending ", message, "to player ", this.player)
    this.player.conn.send({message:message});
    this.conv.messages.push([{name:this.playerServ.myName,conn:undefined},message])
    setTimeout(() => {  this.content.scrollToBottom(100) }, 100);
    
  }

}
