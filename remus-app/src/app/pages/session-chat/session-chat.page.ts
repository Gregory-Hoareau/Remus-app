import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-session-chat',
  templateUrl: './session-chat.page.html',
  styleUrls: ['./session-chat.page.scss'],
})
export class SessionChatPage implements OnInit {

  @Input() player: String;

  constructor() { }

  ngOnInit() {
  }

}
