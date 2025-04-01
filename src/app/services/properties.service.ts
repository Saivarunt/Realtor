import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PropertiesResponse } from '../interfaces/properties-response';
import { LocationResponse } from '../interfaces/location-response';
import { PurchaseResponse } from '../interfaces/purchase-response';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private url:string = environment.backendBaseUrl;

  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  public propertiesShared = new BehaviorSubject<any>([]);
  observeValues = this.propertiesShared.asObservable();

  changeValues(data: any) {
    this.propertiesShared.next(data);
  }

  // getAllProperties() : Observable<PropertiesResponse[]>{
  //   let response:Observable<PropertiesResponse[]> = this.http.get<PropertiesResponse[]>(`${this.url}/user/properties`);
  //   return response;
  // }

  getAllProperties(page: number) : Observable<Pageable>{
    let response:Observable<Pageable> = this.http.get<Pageable>(`${this.url}/user/properties-pageable/?page=${page}`);
    return response;
  }

  getAllPropertiesWithName(name: string) : Observable<PropertiesResponse>{
    let response:Observable<PropertiesResponse> = this.http.get<PropertiesResponse>(`${this.url}/user/property-with-name/${name}`);
    return response;
  }

  postPropertyInfo(user_id: number, name: string, location: LocationResponse, price: number): Observable<HttpResponse<PropertiesResponse>>{
    let response: Observable<HttpResponse<PropertiesResponse>> = this.http.post<PropertiesResponse>(`${this.url}/seller/post-property-info`,{user_id,name,location,price}, {observe:'response'});
    return response;
  }

  updatePropertyInfo(property_id: number,user_id: number, name: string, location: LocationResponse, price: number, availability:boolean ,rating: number, popularity: number): Observable<HttpResponse<PropertiesResponse>>{
    let response: Observable<HttpResponse<PropertiesResponse>> = this.http.put<PropertiesResponse>(`${this.url}/seller/update-property-info/${property_id}`,{user_id,name,location,price,availability,rating,popularity}, {observe:'response'});
    return response;
  }

  buyProperty(agentId: number, propertyId: number): Observable<HttpResponse<PurchaseResponse>> {
    let response: Observable<HttpResponse<PurchaseResponse>> = this.http.post<PurchaseResponse>(`${this.url}/buyer/buy-property/${propertyId}`,{agentId}, {observe:'response'});
    return response;
  }
}
