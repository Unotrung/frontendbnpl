import {DEFAULT_CURRENCY_CODE, DoBootstrap, Injector, LOCALE_ID, NgModule} from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "./material/material.module";
import { PayMockModule } from "./pay-mock/pay-mock.module";
import { StartPaymentComponent } from './pay-mock/start-payment/start-payment.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {createCustomElement} from "@angular/elements";
import {RequestHandlerInterceptor} from "./pay-mock/request-handler.interceptor";
import {environment} from "../environments/environment";
import {registerLocaleData} from "@angular/common";
import localeVn from '@angular/common/locales/vi'
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
registerLocaleData(localeVn)

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        StartPaymentComponent
    ],
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            // @ts-ignore
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
                deps: [HttpClient]
            }
        }),
        HttpClientModule,
        FlexModule,
        FlexLayoutModule,
        PayMockModule,
        MaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: RequestHandlerInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: environment.lang},
        {provide: DEFAULT_CURRENCY_CODE, useValue: environment.currencyCode}
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

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
