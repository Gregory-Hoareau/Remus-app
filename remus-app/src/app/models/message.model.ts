import { Player } from './player.models';

export class Message {
    timestamp: Date;
    player: Player;
    message: string;
    target: Player;

    constructor(d: Date, p: Player, m: string, t: Player){
        this.timestamp = d;
        this.player = p;
        this.message = m;
        this.target = t;
    }
}