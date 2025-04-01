import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing/landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersComponent } from '../users/users.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LandingPageComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class LandingPageModule { }
