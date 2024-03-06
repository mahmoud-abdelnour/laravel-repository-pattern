import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  get translateService () {
    return this.injector.get(TranslateService);
  }
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private injector: Injector,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Blob) {
        } else {
          console.log(error);
          if (error.status == 0)
            this.openSnackBar('غير قادر على الوصول للخادم', null, 'error');
          else if (error.status === 401) {
           /*  localStorage.clear();
            localStorage.setItem('lang', this.translateService.defaultLang);
 */

            this.openSnackBar('عفوا...غير مصرح لك بالدخول', null, 'error');
            this.router.navigate(['/auth/login'], {
              queryParams: { redirectUrl: this.router.url },
            });

          } else if (error.status == 404)
            this.openSnackBar('غير موجود', null, 'error');
          else if (error.status == 403 || error.status == 405) {
            let errorText = '';

            if(error.error.errors && typeof error.error.errors == 'object') {
              for(let key in error.error.errors) errorText += error.error.errors[key].join(" , ") + '\n'
              this.openSnackBar(errorText, null, 'error');
            }
            else this.openSnackBar(error.error.response, null, 'error');
          }
          else this.openSnackBar(error.error.response, null, 'error');
        }
        return throwError(error);
      })
    );
  }

  openSnackBar(
    title,
    button = null,
    panelClass = 'success',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
  
    if(title != undefined){
      this._snackBar.open(
        this.translateService.instant(title),
        button ? this.translateService.instant(button) : null,
        {
          horizontalPosition,
          verticalPosition,
          panelClass,
          duration: 5000,
        }
      );
    }
  }
}
