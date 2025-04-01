import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from '../properties.component';
import { RouterModule, Routes } from '@angular/router';

const appRoute: Routes =[
  {
    path:"", component: PropertiesComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute)
  ]
})
export class PropertiesRoutingModule { }
