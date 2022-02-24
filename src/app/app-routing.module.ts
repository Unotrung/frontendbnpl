import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageFailComponent } from './message-fail/message-fail.component';
import { MessageSuccessComponent } from './message-success/message-success.component';
import { ModalComponent } from './modal/modal.component';
import {PayMockComponent} from "./pay-mock/pay-mock.component";
import { PhoneDisplayComponent } from './phone-display/phone-display.component';
import { TypeNidComponent } from './type-nid/type-nid.component';
import { TypePinComponent } from './type-pin/type-pin.component';

const routes: Routes = [
  {path: '', redirectTo: '/pay-mock', pathMatch: 'full'},
  {path: 'message-success', component: MessageSuccessComponent},
  {path: 'message-fail', component: MessageFailComponent},
  {path: 'modal', component: ModalComponent},
  {path: 'type-nid', component: TypeNidComponent},
  {path: 'type-pin', component: TypePinComponent},
  {path: 'phone-display', component: PhoneDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
