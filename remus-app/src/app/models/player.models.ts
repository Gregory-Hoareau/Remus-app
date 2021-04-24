import { DataConnection } from 'peerjs';
import { CharacterSheet } from './character-sheet.model';

export class Player {
    name: String;
    conn: DataConnection;
    character: CharacterSheet;

    constructor(c: DataConnection, n: String="host", ch: CharacterSheet=null){
        this.name = n;
        this.conn = c;
        this.character = ch;
    }
}
