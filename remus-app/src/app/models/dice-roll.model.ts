import { Dice } from './dice.model';

export interface DiceRoll {
    name: string;
    modificator?: number;
    result: number;
    separatedValue: string;
    faces?: string[];
}
