import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PropertiesService } from '../services/properties.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AgentService } from '../services/agent.service';
import { LocationResponse } from '../interfaces/location-response';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddOrUpdateProperty } from '../interfaces/add-or-update-property';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selleractions',
  templateUrl: './selleractions.component.html',
  styleUrls: ['./selleractions.component.sass']
})
export class SelleractionsComponent {
  
  // seller: boolean = sessionStorage.getItem("SELLER") === "true";
  // buyer: boolean = sessionStorage.getItem("BUYER") === "true";
  // admin: boolean = sessionStorage.getItem("ADMIN") === "true";

  addNewLocation: boolean = false;
  updatedLocation: boolean = false;
  // updatePropertyBtn: boolean = false;
  currentUpdatePropertyId: number = -1;
  type:string = "";

  locations: LocationResponse[] = [];
  locationIds: number[] = [];

  constructor(private router:Router, private cookieService: CookieService, private propertiesService: PropertiesService, 
    private landingComponent: LandingPageComponent, private agentService: AgentService, 
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<SelleractionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddOrUpdateProperty,) { }


  ngOnInit() {
    this.locations = this.data.locations;
    this.locationIds = this.data.loactionIds;
    this.currentUpdatePropertyId = this.data.currentUpdatePropertyId;
    this.addOrUpdateFormResponse = this.data.addOrUpdateFormResponse;
    this.type = this.data.type;

    this.addOrUpdateFormBuilder.setValue({
      name:this.data.addOrUpdateFormResponse.name,
      location:{
        country:this.data.addOrUpdateFormResponse.location.country,
        city:this.data.addOrUpdateFormResponse.location.city,
        state:this.data.addOrUpdateFormResponse.location.state,
        primary_address:this.data.addOrUpdateFormResponse.location.primary_address,
        pincode:this.data.addOrUpdateFormResponse.location.pincode,
        coordinates:this.data.addOrUpdateFormResponse.location.coordinates
      },
      price:this.data.addOrUpdateFormResponse.price
    })
  }

  locationResponse = {
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


  addOrUpdateFormBuilder: FormGroup = this.fb.group({
    "name" : ["", [Validators.required, Validators.minLength(5)]],

    "location" : {
  
      "country":["", [Validators.required, Validators.minLength(2)]],
  
      "city":["", [Validators.required, Validators.minLength(2)]],
  
      "state":["", [Validators.required, Validators.minLength(2)]],
  
      "primary_address":["", [Validators.required, Validators.minLength(5)]],
  
      "pincode":["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  
      "coordinates": ["", [Validators.required, Validators.minLength(5)]]
    },

    "price" : [0, [Validators.required, Validators.min(1)]],
  })





  updateLocationDetails() {
    this.addOrUpdateFormResponse.location = this.locationResponse;

    this.addOrUpdateFormBuilder.patchValue({location:{
      country:this.locationResponse.country,
      city:this.locationResponse.city,
      state:this.locationResponse.state,
      primary_address:this.locationResponse.primary_address,
      pincode:this.locationResponse.pincode,
      coordinates:this.locationResponse.coordinates
    }})

    this.updatedLocation = true;
    // console.log(this.addOrUpdateFormResponse);
    
    console.log(this.addOrUpdateFormBuilder.get("location"));
    
  }

  addProperty() {

    console.log(this.addOrUpdateFormBuilder.value, this.addOrUpdateFormBuilder);
    
    if(!this.addOrUpdateFormBuilder.invalid) {
      this.addOrUpdateFormResponse.name = this.addOrUpdateFormBuilder.get('name')!.value || "";
      this.addOrUpdateFormResponse.price = this.addOrUpdateFormBuilder.get('price')!.value || 0;

      this.propertiesService.postPropertyInfo(this.addOrUpdateFormResponse.user_id,this.addOrUpdateFormResponse.name,this.addOrUpdateFormResponse.location,this.addOrUpdateFormResponse.price)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.router.navigate(["/home"])
        },
        error:(error) => {
          console.log(error);
          alert("Error Fetching Details");
        }
      })

    }
    else{
      alert("Enter valid details!");
    }

  }

  
  updateProperty() {
    console.log(this.addOrUpdateFormBuilder.value);

    if(!this.addOrUpdateFormBuilder.invalid) {
      this.addOrUpdateFormResponse.name = this.addOrUpdateFormBuilder.get('name')!.value || "";
      this.addOrUpdateFormResponse.price = this.addOrUpdateFormBuilder.get('price')!.value || 0;

      this.propertiesService.updatePropertyInfo(this.currentUpdatePropertyId,this.addOrUpdateFormResponse.user_id,this.addOrUpdateFormResponse.name
        ,this.addOrUpdateFormResponse.location,this.addOrUpdateFormResponse.price, this.addOrUpdateFormResponse.availability, 
        this.addOrUpdateFormResponse.rating,this.addOrUpdateFormResponse.popularity)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.router.navigate(["/home"])
        },
        error:(error) => {
          console.log(error);
          alert("Error Fetching Details");
        }
      })
    }
    else{
      alert("Enter valid details!");
    }
  }


  newLocation() {
    this.addNewLocation = true;
  }

  getFromLocationList(id: string) {
    let idNew = parseInt(id);
    console.log('Selected Id', idNew);
    
    this.addOrUpdateFormResponse.location = this.locations.filter((location) => {
      return location.locationId === idNew;
    })[0]

    this.addOrUpdateFormBuilder.controls['location'].patchValue({
      country:this.addOrUpdateFormResponse.location.country,
      city:this.addOrUpdateFormResponse.location.city,
      state:this.addOrUpdateFormResponse.location.state,
      primary_address:this.addOrUpdateFormResponse.location.primary_address,
      pincode:this.addOrUpdateFormResponse.location.pincode,
      coordinates:this.addOrUpdateFormResponse.location.coordinates
    })

    console.log(this.addOrUpdateFormBuilder.get("location"));

  }
}
