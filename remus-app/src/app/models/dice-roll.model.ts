import { Dice } from './dice.model';

export interface DiceRoll {
    dices: Map<Dice, number>;
    modificator?: number;
    result?: number;
    separatedValue?: string;
}
