import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratorChoicePage } from './generator-choice.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratorChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratorChoicePageRoutingModule {}
