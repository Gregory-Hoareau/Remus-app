import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.models';
import { Conversation } from 'src/app/models/conversation.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-session-chat',
  templateUrl: './session-chat.page.html',
  styleUrls: ['./session-chat.page.scss'],
})
export class SessionChatPage implements OnInit {

  myForm : FormGroup;
  @Input() player: Player;
  @Input() conv: Conversation;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit() {    
    this.myForm = this.formBuilder.group({
      message: ''
  })
    console.table(this.conv.messages)
  }

  send() {
    console.table(this.myForm.getRawValue())
    const message = this.myForm.getRawValue().message
    console.log("sending ", message)
    this.player.conn.send({message:message});
  }

}
