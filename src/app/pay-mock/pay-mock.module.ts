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
import { ImageOnTopComponent } from './image-on-top/image-on-top.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerPinInstallComponent } from './customer-pin-install/customer-pin-install.component';
import { CustomerEsignConfirmComponent } from './customer-esign-confirm/customer-esign-confirm.component';
import { CustomerInformationProcessComponent } from './customer-information-process/customer-information-process.component';
import { CustomerInformationFinishComponent } from './customer-information-finish/customer-information-finish.component';
import { CustomerInformationRegisterComponent } from './customer-information-register/customer-information-register.component';
import {
  CustomerConfirmDialogComponent,
  CustomerConfirmInfoComponent
} from './customer-confirm-info/customer-confirm-info.component';
import {PictureSelfieComponent} from "./picture-selfie/picture-selfie.component";
import {ErrorServerComponent} from "./error-server/error-server.component";
import {CountdownModule} from "ngx-countdown";
import {WebcamModule} from "ngx-webcam";
import { CameraModalComponent } from './camera-modal/camera-modal.component';
import {HttpClientModule} from "@angular/common/http";
import { CitizenCardComponent } from './citizen-card/citizen-card.component';
import {EnterOtpComponent} from "./customer-esign-confirm/enter-opt.component";
import {CheckoutDetailBillComponent} from "./checkout-detail-bill/checkout-detail-bill.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import { LoadingComponent } from './loading/loading.component';
import { ForgotPinPhoneComponent } from './forgot-pin-phone/forgot-pin-phone.component';
import { ForgotPinCardIdComponent } from './forgot-pin-card-id/forgot-pin-card-id.component';
import { MarginBottomDirective } from './helper/margin-bottom.directive';
import { MessageComponent } from './message/message.component';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";


@NgModule({
  declarations: [
    RegisterComponent,
    CartInformationComponent,
      MarginTopDirective,
      HighlightDirective,
      VerifyPinComponent,
      ElDimensionDirective,
      ImageOnTopComponent,
      CustomerPinInstallComponent,
      CustomerEsignConfirmComponent,
      CustomerInformationProcessComponent,
      CustomerInformationFinishComponent,
      CustomerInformationRegisterComponent,
      CustomerConfirmInfoComponent,
      CustomerConfirmDialogComponent,
      PictureSelfieComponent,
      ErrorServerComponent,
      EnterOtpComponent,
      CameraModalComponent,
      CitizenCardComponent,
      CheckoutDetailBillComponent,
      CheckoutComponent,
      LoadingComponent,
      ForgotPinPhoneComponent,
      ForgotPinCardIdComponent,
      MarginBottomDirective,
      MessageComponent,
  ],
    exports: [
        LoadingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        NgxIntlTelInputModule,
        FlexModule,
        FlexLayoutModule,
        WebcamModule,
        CodeInputModule,
        PayMockRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CountdownModule
    ]
})
export class PayMockModule { }
