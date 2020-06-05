import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {AchivementPageRoutingModule} from './achivement-routing.module';
import {AchivementPage} from './achivement.page';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AchivementPageRoutingModule
  ],
  declarations: [AchivementPage]
})
export class AchivementPageModule {}
