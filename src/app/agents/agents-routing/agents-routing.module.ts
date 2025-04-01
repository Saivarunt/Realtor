import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from '../agents.component';
import { RouterModule, Routes } from '@angular/router';


const appRoute: Routes =[
  {
    path:"", component: AgentsComponent
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
export class AgentsRoutingModule { }
