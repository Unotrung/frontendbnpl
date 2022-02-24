import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PayMockComponent} from "./pay-mock/pay-mock.component";

const routes: Routes = [
  // {path: '', redirectTo: '/pay-mock', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
