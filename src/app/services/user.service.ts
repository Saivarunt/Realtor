import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = environment.backendBaseUrl;

  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  getUserInfo() : Observable<UserResponse>{
    let response:Observable<UserResponse> = this.http.get<UserResponse>(`${this.url}/user/by-id/${sessionStorage.getItem('u_id')}`);
    return response;
  }

  updateUserInfo(username: string, fullname: string | null | undefined, email: string | null | undefined, phonenumber: string | null | undefined) : Observable<HttpResponse<UserResponse>>{
    let response: Observable<HttpResponse<UserResponse>> = this.http.post<UserResponse>(`${this.url}/user/user-info`, {username,fullname,email,phonenumber}, {observe:'response'});
    return response;
  }

  getAllUserInfo(page: number) : Observable<Pageable>{
    let response:Observable<Pageable> = this.http.get<Pageable>(`${this.url}/user/info/?page=${page}`);
    return response;
  }
}
