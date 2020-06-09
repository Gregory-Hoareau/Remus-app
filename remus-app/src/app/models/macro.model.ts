import {SpecialDice} from "./special-dice.model";

export interface Macro {
    name: string;
    dices: Map<SpecialDice, number>;
    stringDices: string;
    modificator?: number;
    isItNormalDices: boolean;

}
