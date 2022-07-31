import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulateurPage } from './simulateur.page';
import { Location, LocationStrategy } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MacroService} from "../../providers/macro/macro.service";
import {Macro} from "../../models/macro.model";

describe('SimulateurPage', () => {
  let component: SimulateurPage;
  let fixture: ComponentFixture<SimulateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateurPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add and roll dice', () => {
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd6', value: 6});
    component.launchDice();
    expect(component.result).toBeGreaterThanOrEqual(2);
    expect(component.result).toBeLessThanOrEqual(10);
    expect(component.totalDiceSum).toBe(10);
  });
  it('should have 5 different separated value', () => {
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.launchDice();
    expect(component.finalSeparatedValue.length).toBe(17);
  });
  it('should create and launch a macro', () => {
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    const macro = {
      name: 'boule de feu',
      dices: component.diceSelected,
      stringDices: component.listOfDiceAsString,
      modifier: component.modificateur,
      isItNormalDices: component.normalDices
    } as Macro
    component.macroLaunch(macro);
    expect(component.result).toBeGreaterThanOrEqual(5);
    expect(component.result).toBeLessThanOrEqual(20);
    expect(component.totalDiceSum).toBe(20);
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.modificateur = 5;
    const macro2 = {
      name: 'boule de glace',
      dices: component.diceSelected,
      stringDices: component.listOfDiceAsString,
      modifier: component.modificateur,
      isItNormalDices: component.normalDices
    } as Macro
    component.macroLaunch(macro2);
    expect(component.result).toBeGreaterThanOrEqual(10);
    expect(component.result).toBeLessThanOrEqual(25);
    expect(component.totalDiceSum).toBe(20);
  });
});
