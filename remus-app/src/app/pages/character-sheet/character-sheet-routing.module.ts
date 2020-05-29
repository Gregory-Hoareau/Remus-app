import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterSheetPage } from './character-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterSheetPageRoutingModule {}
