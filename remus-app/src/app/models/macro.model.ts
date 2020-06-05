import {Dice} from "./dice.model";

export interface Macro {
    name: string;
    dices: Map<Dice, number>;
    stringDices: string;
    modificator?: number;

}
