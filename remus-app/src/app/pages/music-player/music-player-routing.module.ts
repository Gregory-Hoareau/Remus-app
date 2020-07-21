import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicPlayerPage } from './music-player.page';

const routes: Routes = [
  {
    path: '',
    component: MusicPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicPlayerPageRoutingModule {}
