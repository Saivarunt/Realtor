import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = sessionStorage.getItem("jwt");
    console.log(jwtToken);
    
    if (jwtToken) {
        const cloned = request.clone({
            headers: request.headers.set("Authorization",
            `Bearer ${jwtToken}`)
        });

        return next.handle(cloned);
    }

    return next.handle(request);
  }
}
