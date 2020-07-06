import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratorChoicePageRoutingModule } from './generator-choice-routing.module';

import { GeneratorChoicePage } from './generator-choice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratorChoicePageRoutingModule
  ],
  declarations: [GeneratorChoicePage]
})
export class GeneratorChoicePageModule {}
