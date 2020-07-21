import {NgModule, ViewContainerRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import {IonicModule, IonicRouteStrategy, IonRouterOutlet, NavParams} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import {DiceHistoryService} from './providers/diceHistory/dice-history.service';
import { CharacterService } from './providers/character/character.service';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { SessionChatPageModule } from './pages/session-chat/session-chat.module';
import {AchivementPage} from './pages/achivement/achivement.page';
import {AchivementPageModule} from './pages/achivement/achivement.module';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { JoinFormPageModule } from './pages/join-form/join-form.module';
import { SMS } from '@ionic-native/sms/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MusicService } from './providers/music/music.service';
import { MusicControls } from '@ionic-native/music-controls/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      BrowserAnimationsModule,
      FontAwesomeModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      SessionChatPageModule,
      AchivementPageModule,
      JoinFormPageModule
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    FileChooser,
    FilePath,
    ImagePicker,
    File,
    DiceHistoryService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CharacterService,
    NavParams,
    Base64ToGallery,
    Deeplinks,
    SMS,
    Contacts,
    AndroidPermissions,
    MusicService,
    MusicControls
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
