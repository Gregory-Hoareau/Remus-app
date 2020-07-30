import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratorChoicePageRoutingModule } from './generator-choice-routing.module';

import { GeneratorChoicePage } from './generator-choice.page';
import { CharacterNameGeneratorPageModule } from '../character-name-generator/character-name-generator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratorChoicePageRoutingModule,
    CharacterNameGeneratorPageModule
  ],
  declarations: [GeneratorChoicePage]
})
export class GeneratorChoicePageModule {}
