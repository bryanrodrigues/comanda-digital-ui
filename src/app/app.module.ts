import { SecurityModule } from './security/security.module';
import { CardModule } from './card/card.module';
import { StoreModule } from './store/store.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ToastyModule } from 'ng2-toasty';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductModule } from './product/product.module';
import { CoreModule } from './core/core.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { JwtHttpInterceptor } from './security/jwt-http-interceptor';
import { KitchenModule } from './kitchen/kitchen.module';
import { ReportModule } from './report/report.module';
import { ChartModule } from 'primeng/chart';



registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserModule,
    StoreModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    ProductModule,
    CardModule,
    CoreModule,
    SecurityModule,
    KitchenModule,
    ReportModule,
    ChartModule

  ],
  providers: [
    {provide: LOCALE_ID , useValue:'pt-BR'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
