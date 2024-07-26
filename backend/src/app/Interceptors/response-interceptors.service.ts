import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptors implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(3),
      map(res => {
        if (res instanceof HttpResponse) {
          console.log(res.body);
          return res;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errMsg = "";
        console.log(error);
        // client-side error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Erorr : ${error.message}`;
        } else { // Server-side error
          errMsg = `Error Code : ${error.status} , Message : ${error.message}`;
        }
        return throwError(errMsg);
      })
    )
  }

}
