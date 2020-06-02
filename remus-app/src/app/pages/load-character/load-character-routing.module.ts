import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadCharacterPage } from './load-character.page';

const routes: Routes = [
  {
    path: '',
    component: LoadCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadCharacterPageRoutingModule {}
