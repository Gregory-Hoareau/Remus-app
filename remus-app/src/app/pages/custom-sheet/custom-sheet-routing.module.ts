import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomSheetPage } from './custom-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: CustomSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomSheetPageRoutingModule {}
