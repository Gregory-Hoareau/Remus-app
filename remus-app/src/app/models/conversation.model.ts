import { Player } from './player.models';

export interface Conversation {
    messages: [Player,string][]
}