import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayMockRoutingModule } from './pay-mock-routing.module';
import { RegisterComponent } from './register/register.component';
import { CartInformationComponent } from './cart-information/cart-information.component';
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MarginTopDirective} from "../helper/margin-top.directive";
import { VerifyPinComponent } from './verify-pin/verify-pin.component';


@NgModule({
  declarations: [
    RegisterComponent,
    CartInformationComponent,
      MarginTopDirective,
      VerifyPinComponent
  ],
  exports: [
    CartInformationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PayMockRoutingModule,
    FlexModule,
      FlexLayoutModule
  ]
})
export class PayMockModule { }
