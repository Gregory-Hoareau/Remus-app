import { Message } from './message.model';
import { Player } from './player.models';

export class Conversation {

    messages: Array<Message>;

    constructor() {
        this.messages = [];
    }

    addMessage(m: Message) {
        const prev = this.messages[this.messages.length-1]
        console.log(m.target)
        console.log(this.getMessageTarget(prev))
        if(this.getMessageTarget(prev) == m.target)
            m.target=undefined
        this.messages.push(m);
    }

    private getMessageTarget(m: Message): Player {
        if (!m)
            return null;
        if (m.target)
            return m.target
        return this.getMessageTarget(this.messages[this.messages.indexOf(m)-1])
    }
}