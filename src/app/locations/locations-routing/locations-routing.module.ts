import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from '../locations.component';



const appRoute: Routes =[
  {
    path:"", component: LocationsComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute)
  ],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
