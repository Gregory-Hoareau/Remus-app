import { Injectable } from '@angular/core';
import { elfName } from './data/character/elf';
import { humanName } from './data/character/human';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  private learning: LearningList;
  private previousData: string;
  private data: string;
  private final: string = '#';

  constructor() {
    this.learning = new LearningList();
  }

  setData(newData) {
    this.data = newData;
  }

  generate(quantity: number, mini: number, maxi: number): string[] {
    if(this.previousData !== this.data) {
      this.learning.learn(this.selectExampleList());
      this.previousData = this.data;
    }

    const names = []

    while(names.length < quantity) {
      const word = this.generateWord();
      if(word.length <= maxi && word.length >= mini && !names.includes(word)) {
        names.push(word);
      }
    }

    return names;
  }

  generateWord(): string {
    let word = '';
    const markovPair = new MarkovPair();
    let choice: string;
    while(markovPair.last() !== this.final) {
      choice = this.learning.pickOne(markovPair);
      word += choice;
      markovPair.updatePair(choice);
    }
    return word.slice(0, word.length - 1);
  }

  private selectExampleList(): string[] {
    switch (this.data) {
      case 'human':
        return humanName;
      case 'elf':
      default:
        return elfName;
    }
  }

}


class MarkovPair {

  private pair: string[];

  constructor() {
    this.pair = ['', ''];
  }

  updatePair(lastLetter: string) {
    this.pair.push(lastLetter);
    this.pair = this.pair.slice(1)
  }

  clear() {
    this.pair = ['', ''];
  }

  last(): string {
    return this.pair[1];
  }

  toString() {
    return this.pair.toString();
  }

}


class LearningList {

  private markovChain: {[key: string]: {[key: string]: number} }; 
  private final: string = '#';

  constructor() {
    this.markovChain = {};
  }

  /**
   * Construct the learning list from the given list
   * 
   */
  learn(exampleWordList: string[]): void {
    const lastPair: MarkovPair = new MarkovPair();
    for(const word of exampleWordList) {
      for(const letter of word) {
        this.addItem(lastPair, letter);
        lastPair.updatePair(letter);
      }
      this.addItem(lastPair, this.final);
      lastPair.clear();
    }
  }

  /**
   * Add as a possible following of 'parent' value, the 'child' value if not existing
   * otherwise increase the apparition counter
   * 
   */
  private addItem(parent: MarkovPair, child: string): void {
    const parentStr = parent.toString();
    if(this.markovChain[parentStr]) {
      if(this.markovChain[parentStr][child]) {
        this.markovChain[parentStr][child] += 1;
      } else {
        this.markovChain[parentStr][child] = 1;
      }
    } else {
      this.markovChain[parentStr] = {};
      this.markovChain[parentStr][child] = 1;
    }
  }

  /**
   * Select a successor of the parent value according to the learning list
   * @param parent 
   */
  pickOne(parent: MarkovPair): string {
    let res = '';
    const parentStr = parent.toString();
    if (this.markovChain[parentStr]) {
      let count = 0;
      const following = this.markovChain[parentStr];
      for (const key in following) {
        count += following[key];
      }
      const rand = Math.ceil(Math.random() * count); // random value between 0 and count
      let temp = 0;
      for(const key in following) {
        temp += following[key];
        if (temp >= rand) {
          return key;
        }
      }

    }
    return res;
  }
}
