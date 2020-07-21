import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicPlayerPageRoutingModule } from './music-player-routing.module';

import { MusicPlayerPage } from './music-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicPlayerPageRoutingModule
  ],
  declarations: [MusicPlayerPage]
})
export class MusicPlayerPageModule {}
