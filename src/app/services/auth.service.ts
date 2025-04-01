import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';  
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { PermissionsResponse } from '../interfaces/permissions-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string = environment.backendBaseUrl;
  isLoggedIn: boolean = this.cookieService.get("logged_in") === "true";


  public permissionsShared = new BehaviorSubject<any>([]);
  observeValues = this.permissionsShared.asObservable();

  changeValues(data: any) { 
    this.permissionsShared.next(data);
  }

  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) {
    cookieService.deleteAll();
    // sessionStorage.clear();
  }

  loginUser(username: string|null|undefined, password: string|null|undefined): Observable<HttpResponse<LoginResponse>> {
    const body = { username, password };
    const response:Observable<HttpResponse<LoginResponse>> = this.http.post<any>(`${this.url}/auth/login`, body, {observe:'response'});
    return response;
  }

  getAllPermissions(uId:string): Observable<PermissionsResponse[]> {
    const response:Observable<PermissionsResponse[]> = this.http.get<any>(`${this.url}/auth/user-permission/?id=${uId}`);
    return response;
  }



  isAuthenticated() :boolean{
    console.log( "LOGIN STATUS",this.isLoggedIn);
    
    return this.isLoggedIn;
  }
}
