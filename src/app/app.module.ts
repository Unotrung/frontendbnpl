import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./material/material.module";
import { MessageSuccessComponent } from './message-success/message-success.component';
import { PayMockComponent } from './pay-mock/pay-mock.component';
import { PayMockModule } from "./pay-mock/pay-mock.module";
import { StartPaymentComponent } from './pay-mock/start-payment/start-payment.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MessageFailComponent } from './message-fail/message-fail.component';
import { ModalComponent } from './modal/modal.component';
import { TypeNidComponent } from './type-nid/type-nid.component';
import { TypePinComponent } from './type-pin/type-pin.component';
import { PhoneDisplayComponent } from './phone-display/phone-display.component';
import { SetupPinComponent } from './setup-pin/setup-pin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutDetailBillComponent } from './checkout-detail-bill/checkout-detail-bill.component';
import { ErrorServerComponent } from './error-server/error-server.component';
import { ProgressbarFiftyComponent } from './progressbar-fifty/progressbar-fifty.component';
import { ProgressbarHundredComponent } from './progressbar-hundred/progressbar-hundred.component';
import { ElectronicContractComponent } from './electronic-contract/electronic-contract.component';


@NgModule({
  declarations: [
    AppComponent,
    PayMockComponent,
    TopBarComponent,
    StartPaymentComponent,
    MessageSuccessComponent,
    MessageFailComponent,
    ModalComponent,
    TypeNidComponent,
    TypePinComponent,
    PhoneDisplayComponent,
    SetupPinComponent,
    CheckoutComponent,
    CheckoutDetailBillComponent,
    ErrorServerComponent,
    ProgressbarFiftyComponent,
    ProgressbarHundredComponent,
    ElectronicContractComponent,
  ],
  imports: [
    BrowserModule,
    FlexModule,
    FlexLayoutModule,
    PayMockModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
