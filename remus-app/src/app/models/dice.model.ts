import { MathsService } from "../providers/maths/maths.service";

export class Dice {
    name: string;
    numberOfFaces: number;

    constructor(name:string, numberOfFaces:number){
        this.name = name;
        this.numberOfFaces = numberOfFaces;
    }

    getRandomface():number{
        return MathsService.getRandomInt(this.numberOfFaces)
    }

}
