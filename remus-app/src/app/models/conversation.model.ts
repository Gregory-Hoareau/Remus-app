import { Message } from './message.model';
import { Player } from './player.models';

export class Conversation extends Array<Message> {

    
    addMessage(m: Message) {
        this.push(m);
    }

    private getMessageTarget(m: Message): Player {
        if (!m)
            return null;
        if (m.target)
            return m.target
        return this.getMessageTarget(this[this.indexOf(m)-1])
    }

    getPreviousMessage(m: Message) {
        const message = this[this.indexOf(m)-1]
        if (message) return this[this.indexOf(m)-1]
        else return new Message(null,null,null,null);

    }
}