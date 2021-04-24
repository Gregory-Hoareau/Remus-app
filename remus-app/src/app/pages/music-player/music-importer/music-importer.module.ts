import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicImporterPageRoutingModule } from './music-importer-routing.module';

import { MusicImporterPage } from './music-importer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicImporterPageRoutingModule
  ],
  declarations: [MusicImporterPage]
})
export class MusicImporterPageModule {}
