import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SessionHomePage } from './sessionHome.page';
import {File} from '@ionic-native/file/ngx';
import {
  SessionHomePageRoutingModule,
} from './sessionHome-routing.module';
import {DocPopupModule} from '../doc-popup/doc-popup.module';
import {DocPopupPage} from '../doc-popup/doc-popup.page';
import {CharacterSheetPageModule} from '../character-sheet/character-sheet.module'
import { SelectCharacterPageModule } from '../select-character/select-character.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimulateurPageModule } from '../simulateur/simulateur.module';
import {AchivementPageModule} from '../achivement/achivement.module';
import {NotesPageModule} from '../notes/notes.module';
import {CanvasPageModule} from '../canvas/canvas.module';
import { CrowdsourcingPageModule } from '../crowdsourcing/crowdsourcing.module';
import { InvitationSenderPageModule } from '../invitation-sender/invitation-sender.module';
import { MusicPlayerPageModule } from '../music-player/music-player.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionHomePageRoutingModule,
    DocPopupModule,
      AchivementPageModule,
    CharacterSheetPageModule,
    SelectCharacterPageModule,
    FontAwesomeModule,
    SimulateurPageModule,
    NotesPageModule,
    CanvasPageModule,
    CrowdsourcingPageModule,
    InvitationSenderPageModule,
    MusicPlayerPageModule
  ],
  declarations: [SessionHomePage],
  providers: [File]
})
export class SessionHomePageModule {}
