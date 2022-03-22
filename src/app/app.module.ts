import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./material/material.module";
// import { PayMockComponent } from './pay-mock/pay-mock.component';
import { PayMockModule } from "./pay-mock/pay-mock.module";
import { StartPaymentComponent } from './pay-mock/start-payment/start-payment.component';
import {HttpClientModule} from "@angular/common/http";
import {TopBarComponent} from "./top-bar/top-bar.component";

@NgModule({
    declarations: [
        AppComponent,
        // PayMockComponent,
        TopBarComponent,
        StartPaymentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(
        //     InMemoryDataService, {dataEncapsulation: false}
        // ),
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
