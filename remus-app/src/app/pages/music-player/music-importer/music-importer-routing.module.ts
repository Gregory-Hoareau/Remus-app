import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicImporterPage } from './music-importer.page';

const routes: Routes = [
  {
    path: '',
    component: MusicImporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicImporterPageRoutingModule {}
