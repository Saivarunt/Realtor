import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationResponse } from '../interfaces/location-response';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url:string = environment.backendBaseUrl;

  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  getAllLocations() : Observable<LocationResponse[]>{
    let response:Observable<LocationResponse[]> = this.http.get<LocationResponse[]>(`${this.url}/user/locations`);
    return response;
  }

  getAllLocationsPageable(page: number) : Observable<Pageable>{
    let response:Observable<Pageable> = this.http.get<Pageable>(`${this.url}/user/locations-by-page/?page=${page}`);
    return response;
  }
}
