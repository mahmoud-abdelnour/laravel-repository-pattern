import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ErrorComponent } from 'src/shared/components/error.component';
import { MatIconModule } from '@angular/material/icon';
import { JwtModule } from "@auth0/angular-jwt";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpConfigInterceptor } from 'src/shared/services/http.interceptor';
import { NgxEchartsModule } from 'ngx-echarts';

export function tokenGetter() {
  return localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: ( localStorage.getItem('lang') == 'null' || !localStorage.getItem('lang')) ? 'ar' : localStorage.getItem('lang') 
    }),
    NgxValidateCoreModule.forRoot({
      blueprints: {
        required:'Errors.required',
        min: "لا يجب أن تقل قيمة هذا الحقل عن {{ min }}",
        max: "لا يجب أن تزيد قيمة هذا الحقل عن {{ max }}",
        minDate:'لا يجب أن يقل تاريخ البدء عن {{ minDate }}',
        maxDate:'لا يجب أن يزيد تاريخ الإنتهاء {{ maxDate }}',
        lessThanStart: 'تاريخ هذا الحقل لا يجب أن يكون قبل تاريخ البدء',
        matchError:'Errors.Match',
        minlength:'Errors.minLength',
        maxlength:'Errors.maxLength',
        email:'Errors.email',
        checkError:'Errors.check',
        cantBeNegative:'Errors.cantBeNegative',
        notValidInteger:'Errors.notValidInteger',
        NoZeros:'قيمة غير صالحة',
        Iban:' رقم ايبان غير صالح , لابد ان يكون 22 رقم بدون SA',
      },
      errorTemplate: ErrorComponent,
      targetSelector: '.form-group',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    MatSnackBarModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ar-EG' },
    {
      provide : HTTP_INTERCEPTORS , useClass :HttpConfigInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
