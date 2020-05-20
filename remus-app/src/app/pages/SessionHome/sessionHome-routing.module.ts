import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionHomePage } from './sessionHome.page';

const routes: Routes = [
  {
    path: '',
    component: SessionHomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionHomePageRoutingModule {}
