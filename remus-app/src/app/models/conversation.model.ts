import { Message } from './message.model';

export class Conversation {

    messages: Array<Message>;

    constructor(){
        this.messages = [];
    }

    addMessage(m: Message){
        const prev = this.messages[this.messages.length-1]
        if(prev &&  (!prev.player.name || prev.player.name==m.player.name))
            m.player.name=undefined
        this.messages.push(m);
    }
}