import { DataConnection } from 'peerjs';

export interface Player {
    name: string;
    conn: DataConnection;
}
