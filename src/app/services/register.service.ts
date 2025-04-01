import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url:string = environment.backendBaseUrl;
  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  registerAgent(username: string|null|undefined, password: string|null|undefined): Observable<HttpResponse<RegisterResponse>> {
    const body = { username, password };
    let response:Observable<HttpResponse<RegisterResponse>> = this.http.post<any>(`${this.url}/auth/agent-registration`, body, {observe:'response'});
    return response;
  }
  registerBuyer(username: string|null|undefined, password: string|null|undefined): Observable<HttpResponse<RegisterResponse>> {
    const body = { username, password };
    let response:Observable<HttpResponse<RegisterResponse>> = this.http.post<any>(`${this.url}/auth/buyer-registration`, body, {observe:'response'});
    return response;
  }
  registerSeller(username: string|null|undefined, password: string|null|undefined): Observable<HttpResponse<RegisterResponse>> {
    const body = { username, password };
    let response:Observable<HttpResponse<RegisterResponse>> = this.http.post<any>(`${this.url}/auth/seller-registration`, body, {observe:'response'});
    return response;
  }
}