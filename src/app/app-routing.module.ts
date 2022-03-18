import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./pay-mock/page-not-found/page-not-found.component";

const routes: Routes = [
  // {path: '', redirectTo: '/pay-mock', pathMatch: 'full'}\
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
