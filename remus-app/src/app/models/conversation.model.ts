import { Player } from './player.models';

export class Conversation {
    messages: Array<{timestamp:Date ,player: Player,message: string, target: Player}>;

    constructor(){
        this.messages = [];
    }
}