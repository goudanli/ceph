import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CephModule } from './ceph/ceph.module';
import { CoreModule } from './core/core.module';
import { ApiInterceptorService } from './shared/services/api-interceptor.service';
import { JsErrorHandler } from './shared/services/js-error-handler.service';
import { SharedModule } from './shared/shared.module';

export class CustomOption extends ToastOptions {
  animate = 'flyRight';
  newestOnTop = true;
  showCloseButton = true;
  enableHTML = true;
}

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    CephModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  exports: [SharedModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: JsErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    {
      provide: ToastOptions,
      useClass: CustomOption
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
