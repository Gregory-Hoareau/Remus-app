import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'host-form',
    loadChildren: () => import('./pages/host-form/host-form.module').then( m => m.HostFormPageModule)
  },
  {
    path: 'sessionHome',
    loadChildren : () => import('./pages/SessionHome/sessionHome.module').then(m => m.SessionHomePageModule)
  },
  {
    path: 'character-sheet',
    loadChildren: () => import('./pages/character-sheet/character-sheet.module').then( m => m.CharacterSheetPageModule)
  },
  {
    path: 'doc-popup',
    loadChildren: () => import('./pages/doc-popup/doc-popup.module').then( m => m.DocPopupModule)
  }, {
    path: 'share-popup',
    loadChildren: () => import('./pages/share-popup/share-popup.module').then( m => m.SharePopupModule)
  },
  {
    path: 'join-form',
    loadChildren: () => import('./pages/join-form/join-form.module').then(m => m.JoinFormPageModule)
  },
  {
    path: 'simulateur',
    loadChildren: () => import('./pages/simulateur/simulateur.module').then(m => m.SimulateurPageModule)
  },
  {
    path: 'select-character',
    loadChildren: () => import('./pages/select-character/select-character.module').then( m => m.SelectCharacterPageModule)
  },
  {
    path: 'crowdsourcing',
    loadChildren: () => import('./pages/crowdsourcing/crowdsourcing.module').then( m => m.CrowdsourcingPageModule)
  },
  {
    path: 'session-chat',
    loadChildren: () => import('./pages/session-chat/session-chat.module').then( m => m.SessionChatPageModule)
  },
  {
    path: 'achivement',
    loadChildren: () => import('./pages/achivement/achivement.module').then(m=>m.AchivementPageModule)
  },
  {
    path: 'load-character',
    loadChildren: () => import('./pages/load-character/load-character.module').then( m => m.LoadCharacterPageModule)
  },
  {
    path: 'session-home',
    loadChildren: () => import('./pages/session-home/session-home.module').then( m => m.SessionHomePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
