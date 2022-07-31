import {SpecialDice} from "./special-dice.model";

export interface Macro {
    name: string;
    dices: Map<SpecialDice, number>;
    stringDices: string;
    modifier?: number;
    isItNormalDices: boolean;

}
