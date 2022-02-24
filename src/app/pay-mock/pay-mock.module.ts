import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayMockRoutingModule } from './pay-mock-routing.module';
import { RegisterComponent } from './register/register.component';
import { CartInformationComponent } from './cart-information/cart-information.component';
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MarginTopDirective} from "./helper/margin-top.directive";
import { VerifyPinComponent } from './verify-pin/verify-pin.component';
import {HighlightDirective} from "./helper/highlight.directive";
import { ElDimensionDirective } from './helper/el-dimension.directive';
import {CodeInputModule} from "angular-code-input";
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';


@NgModule({
  declarations: [
    RegisterComponent,
    CartInformationComponent,
      MarginTopDirective,
      HighlightDirective,
      VerifyPinComponent,
      ElDimensionDirective,
      ForgotPinComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
    CodeInputModule,
    PayMockRoutingModule
  ]
})
export class PayMockModule { }
