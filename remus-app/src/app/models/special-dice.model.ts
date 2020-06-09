import {Dice} from './dice.model';

export interface SpecialDice extends Dice {
    faces?: Array<string>;
}
