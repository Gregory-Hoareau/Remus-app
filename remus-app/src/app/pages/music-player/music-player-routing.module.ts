import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicPlayerPage } from './music-player.page';

const routes: Routes = [
  {
    path: '',
    component: MusicPlayerPage
  },  {
    path: 'music-importer',
    loadChildren: () => import('./music-importer/music-importer.module').then( m => m.MusicImporterPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicPlayerPageRoutingModule {}
