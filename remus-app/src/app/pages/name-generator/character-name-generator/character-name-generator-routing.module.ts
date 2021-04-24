import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterNameGeneratorPage } from './character-name-generator.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterNameGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterNameGeneratorPageRoutingModule {}
