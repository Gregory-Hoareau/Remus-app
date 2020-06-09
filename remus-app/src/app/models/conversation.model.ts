import { Message } from './message.model';

export class Conversation {

    messages: Array<Message>;

    constructor(){
        this.messages = [];
    }
}