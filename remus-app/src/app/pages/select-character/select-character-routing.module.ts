import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCharacterPage } from './select-character.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCharacterPageRoutingModule {}
