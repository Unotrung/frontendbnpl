import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayMockRoutingModule } from './pay-mock-routing.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { MarginTopDirective } from "./helper/margin-top.directive";
import { VerifyPinComponent } from './verify-pin/verify-pin.component';
import { HighlightDirective } from "./helper/highlight.directive";
import { ElDimensionDirective } from './helper/el-dimension.directive';
import { CodeInputModule } from "angular-code-input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerPinInstallComponent } from './customer-pin-install/customer-pin-install.component';
import { CustomerEsignConfirmComponent } from './customer-esign-confirm/customer-esign-confirm.component';
import { CustomerInformationProcessComponent } from './customer-information-process/customer-information-process.component';
import { CustomerInformationRegisterComponent } from './customer-information-register/customer-information-register.component';
import { CustomerConfirmInfoComponent } from './customer-confirm-info/customer-confirm-info.component';
import { PictureSelfieComponent } from "./picture-selfie/picture-selfie.component";
import { CountdownModule } from "ngx-countdown";
import { WebcamModule } from "ngx-webcam";
import { CameraModalComponent } from './camera-modal/camera-modal.component';
import { HttpClientModule } from "@angular/common/http";
import { CitizenCardComponent } from './citizen-card/citizen-card.component';
import { EnterOtpComponent } from "./enter-otp/enter-otp.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { LoadingComponent } from './loading/loading.component';
import { ForgotPinPhoneComponent } from './forgot-pin-phone/forgot-pin-phone.component';
import { ForgotPinCardIdComponent } from './forgot-pin-card-id/forgot-pin-card-id.component';
import { MarginBottomDirective } from './helper/margin-bottom.directive';
import { MessageComponent } from './message/message.component';
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { CheckoutConfirmComponent } from './checkout-confirm/checkout-confirm.component';
import { CheckoutHeaderComponent } from './checkout-header/checkout-header.component';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';
import { CheckoutTenorComponent } from './checkout-tenor/checkout-tenor.component';
import { CheckoutItemsComponent } from './checkout-items/checkout-items.component';
import { VerifyPinChildComponent } from './verify-pin-child/verify-pin-child.component';
import { CheckoutFinishComponent } from './checkout-finish/checkout-finish.component';
import { CheckoutNotEnoughCreditComponent } from './checkout-not-enough-credit/checkout-not-enough-credit.component';
import { ForgotPinOtpComponent } from './forgot-pin-otp/forgot-pin-otp.component';
import { ForgotPinPinComponent } from './forgot-pin-pin/forgot-pin-pin.component';
import { ForgotPinSuccessComponent } from './forgot-pin-success/forgot-pin-success.component';
import { ForgotPinFailComponent } from './forgot-pin-fail/forgot-pin-fail.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressStepComponent } from './progress-step/progress-step.component';
import { PayMockComponent } from "./pay-mock.component";
import {TranslateModule} from "@ngx-translate/core";
import { PluralTranslatePipe } from './helper/plural-translate.pipe';
import { CheckoutConfirmPinComponent } from './checkout-confirm-pin/checkout-confirm-pin.component';
import { SmallImageWrapperComponent } from './small-image-wrapper/small-image-wrapper.component';
import { VooloRegisterHeaderComponent } from './voolo-register-header/voolo-register-header.component';


@NgModule({
  declarations: [
      PayMockComponent,
    RegisterComponent,
      MarginTopDirective,
      HighlightDirective,
      VerifyPinComponent,
      ElDimensionDirective,
      CustomerPinInstallComponent,
      CustomerEsignConfirmComponent,
      CustomerInformationProcessComponent,
      CustomerInformationRegisterComponent,
      CustomerConfirmInfoComponent,
      PictureSelfieComponent,
      EnterOtpComponent,
      CameraModalComponent,
      CitizenCardComponent,
      CheckoutComponent,
      LoadingComponent,
      ForgotPinPhoneComponent,
      ForgotPinCardIdComponent,
      MarginBottomDirective,
      MessageComponent,
      CheckoutConfirmComponent,
      CheckoutHeaderComponent,
      CheckoutItemComponent,
      CheckoutTenorComponent,
      CheckoutItemsComponent,
      VerifyPinChildComponent,
      CheckoutFinishComponent,
      CheckoutNotEnoughCreditComponent,
      ForgotPinOtpComponent,
      ForgotPinPinComponent,
      ForgotPinSuccessComponent,
      ForgotPinFailComponent,
      ProgressBarComponent,
      ProgressStepComponent,
      PluralTranslatePipe,
      CheckoutConfirmPinComponent,
      SmallImageWrapperComponent,
      VooloRegisterHeaderComponent
  ],
    exports: [
        LoadingComponent,
        CheckoutItemsComponent,
        MarginTopDirective
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            extend: true
        }),
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
