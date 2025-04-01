import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PropertiesService } from '../services/properties.service';
import { PropertiesResponse } from '../interfaces/properties-response';
import { HttpErrorResponse } from '@angular/common/http';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LocationService } from '../services/location.service';
import { LocationResponse } from '../interfaces/location-response';
import { AgentResponse } from '../interfaces/agent-response';
import { AgentService } from '../services/agent.service';
import { Pageable } from '../interfaces/pageable';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { SelleractionsComponent } from '../selleractions/selleractions.component';
import { BuyeractionsComponent } from '../buyeractions/buyeractions.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],

})
export class PropertiesComponent {

  currentPropertySelection: PropertiesResponse | null = null;

  agents: AgentResponse[] = [];
  addNewLocation: boolean = false;
  updatedLocation: boolean = false;
  updatePropertyBtn: boolean = false;
  showComponent:boolean = false;
  currentUpdatePropertyId: number = -1;

  selectedAgentId:number = 0;
  selectedAgentDetails: AgentResponse | null = null;

  seller: boolean = sessionStorage.getItem("SELLER") === "true";
  buyer: boolean = sessionStorage.getItem("BUYER") === "true";
  admin: boolean = sessionStorage.getItem("ADMIN") === "true";

  @Output() propertyDetailsClickEvent = new EventEmitter<{locations: LocationResponse[], loactionIds: number[]}>();
  
  @Output() propertyToUpdateClickEvent = new EventEmitter<{
    addOrUpdateFormResponse: 
    {
    user_id: number;
    name: string;
    location: LocationResponse;
    price: number;
    availability: boolean;
    rating: number;
    popularity: number;
    }, currentUpdatePropertyId: number
  }>();


  onAddOrUpdateProperty() {
    this.propertyDetailsClickEvent.emit({locations: this.locations, loactionIds: this.locationIds})
  }

  paginationValues: Pageable | null = null; 

  pageNumber:number = 0;
  totalElements:number = 0;
  pageIndex = 0;
  pageSize = 10;
  
  currentLocationSelection: number | null = null; 
  currentUser:number = parseInt(sessionStorage.getItem('u_id') || "-1");


  properties: PropertiesResponse[] = [];
  locations: LocationResponse[] = [];
  locationIds: number[] = [];

  constructor(private router:Router, private cookieService: CookieService, private propertiesService: PropertiesService,
     private landingComponent: LandingPageComponent, private agentService: AgentService, public dialog: MatDialog, private authService:AuthService) {}


  
  openaddDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(SelleractionsComponent, {
      width: '80vh',
      height: '80vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{locations: this.locations, loactionIds: this.locationIds, addOrUpdateFormResponse: this.addOrUpdateFormResponse, currentUpdatePropertyId: this.currentUpdatePropertyId, type: "add"}
    });
  }

  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(SelleractionsComponent, {
      width: '80vh',
      height: '80vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{locations: this.locations, loactionIds: this.locationIds, addOrUpdateFormResponse: this.addOrUpdateFormResponse, currentUpdatePropertyId: this.currentUpdatePropertyId, type: "update"}
    });
  }

  openBuyDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(BuyeractionsComponent, {
      width: '80vh',
      height: '80vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{ currentPropertySelection: this.currentPropertySelection}
    });
  }

  locationResponse: LocationResponse = {
    "locationId":0,

    "country":"",

    "city":"",

    "state":"",

    "primary_address":"",

    "pincode":"",

    "coordinates": ""
  }

  addOrUpdateFormResponse = {
    "user_id" : parseInt(sessionStorage.getItem('u_id') || "-1"),

    "name" : "",

    "location" : this.locationResponse,

    "price" : 0,

    "availability": true,

    "rating": 0,

    "popularity": 0
  
  }

  showForm() {
    this.showComponent = true;
  }

  propertyDisplay(page: number) {
    this.propertiesService.getAllProperties(page)
    .subscribe({
      next: (response) =>{
        console.log("propeties",response.content);
        this.paginationValues = response;
        this.properties = response.content;
        this.totalElements = response.totalElements 
        this.pageSize = response.size;
        console.log(this.totalElements);
        
        console.log(this.properties);

        this.properties.forEach((property) => {
          if(this.locationIds.indexOf(property.location.locationId) === -1){
            this.locations.push(property.location);
            this.locationIds.push(property.location.locationId)
          }
        })
        
      },
      error:(error) => {
        console.log(error);
        alert("Error Fetching Details");
      }
    })
  }

  ngOnInit() {
    // this.landingComponent.inHome = false;

    this.propertyDisplay(this.pageIndex)


  }


  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.propertyDisplay(this.pageIndex);
  }
  
  backHome(){
    this.landingComponent.inHome = true;
    this.router.navigate(['/home'])
  }

  buyerInterest(property: PropertiesResponse) {
    this.currentPropertySelection = property;
    this.openBuyDialog('30ms', '30ms');
  }

  updateInfo(propertySelectedToUpdate: number) {
    this.updatePropertyBtn = true;
    this.currentUpdatePropertyId = propertySelectedToUpdate;
    let currentProperty = this.properties.filter((property) => {
      return property.propertyId === propertySelectedToUpdate;
    })[0]
    this.addOrUpdateFormResponse.name = currentProperty.name;
    this.addOrUpdateFormResponse.location = currentProperty.location;
    this.addOrUpdateFormResponse.price = currentProperty.price;
    this.addOrUpdateFormResponse.availability = currentProperty.availability;
    this.addOrUpdateFormResponse.rating = currentProperty.rating;
    this.addOrUpdateFormResponse.popularity = currentProperty.popularity;

    console.log("triggered");
    
    this.propertyToUpdateClickEvent.emit({addOrUpdateFormResponse: this.addOrUpdateFormResponse, currentUpdatePropertyId: this.currentUpdatePropertyId});

    this.openUpdateDialog('30ms', '30ms');
  }


}

