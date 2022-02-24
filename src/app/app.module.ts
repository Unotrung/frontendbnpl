import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayMockComponent } from './pay-mock/pay-mock.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import {MaterialModule} from "./material/material.module";
import { StartPaymentComponent } from './pay-mock/start-payment/start-payment.component';
import {PayMockModule} from "./pay-mock/pay-mock.module";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";

@NgModule({
    declarations: [
        AppComponent,
        PayMockComponent,
        TopBarComponent,
        StartPaymentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {dataEncapsulation: false}
        ),
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
