import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocationResponse } from '../interfaces/location-response';
import { LocationService } from '../services/location.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../interfaces/pageable';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {

  locations: LocationResponse[] | null = null;
  totalElements:number = 0;
  pageIndex = 0;
  pageSize = 10;
  paginationValues:Pageable | null = null;

  constructor(private router:Router, private cookieService: CookieService, private locationService :LocationService, private landingComponent: LandingPageComponent) { }

  locationDisplay(page: number) {
    this.locationService.getAllLocationsPageable(page)
    .subscribe({
      next: (response) =>{
        console.log("locations",response);
        this.locations = response.content;
        this.paginationValues = response;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        console.log(this.locations);
        
      },
      error:(error) => {
        console.log(error);
        alert("Error Fetching Details");
      }
    })
  }

  ngOnInit() {
    // this.landingComponent.inHome = false;
    this.locationDisplay(this.pageIndex)
  }
  
  
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.locationDisplay(this.pageIndex);
  }

  backHome(){
    this.landingComponent.inHome = true;
    this.router.navigate(['/home'])
  }
}
