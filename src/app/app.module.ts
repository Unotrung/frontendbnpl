import {DoBootstrap, Injector, NgModule} from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./material/material.module";
import { PayMockModule } from "./pay-mock/pay-mock.module";
import { StartPaymentComponent } from './pay-mock/start-payment/start-payment.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {createCustomElement} from "@angular/elements";
import {RequestHandlerInterceptor} from "./pay-mock/request-handler.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        StartPaymentComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FlexModule,
        FlexLayoutModule,
        PayMockModule,
        MaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: RequestHandlerInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// export class AppModule implements DoBootstrap {
//     constructor(private injector: Injector) {
//         const webComponent = createCustomElement(AppComponent, { injector: this.injector });
//         customElements.define('angular-component', webComponent);
//     }
//
//     ngDoBootstrap() { }
// }

