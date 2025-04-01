import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile.component';
import { RouterModule, Routes } from '@angular/router';


const appRoute: Routes =[
  {
    path:"", component: ProfileComponent
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
export class ProfileRoutingModule { }
