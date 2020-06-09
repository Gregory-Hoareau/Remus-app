import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { PlayersService } from 'src/app/providers/players/players.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() m: Message;

  constructor(public playerServ: PlayersService) { }

  ngOnInit() {

  }

}
