import { Message } from './message.model';
import { Player } from './player.models';

export class Conversation extends Array<Message> {

    
    addMessage(m: Message) {
        const prev = this[this.length-1]
        console.log(m.target)
        console.log(this.getMessageTarget(prev))
        if(this.getMessageTarget(prev) == m.target)
            m.target=undefined
        this.push(m);
    }

    private getMessageTarget(m: Message): Player {
        if (!m)
            return null;
        if (m.target)
            return m.target
        return this.getMessageTarget(this[this.indexOf(m)-1])
    }
}