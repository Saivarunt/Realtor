import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { PropertiesComponent } from './properties/properties.component';
import { LocationsComponent } from './locations/locations.component';
import { AgentsComponent } from './agents/agents.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { SelleractionsComponent } from './selleractions/selleractions.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { BuyeractionsComponent } from './buyeractions/buyeractions.component';
import { PropertiesBackgroundDirective } from './directives/properties-background.directive';
import { UsersComponent } from './users/users.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SellerPermissionsDirective } from './directives/seller-permissions.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // LandingPageComponent,
    RegisterComponent,
    BuyeractionsComponent,
    // SellerPermissionsDirective,
    // SearchResultsComponent,
    // UsersComponent,
    // PropertiesBackgroundDirective,
    // PropertiesComponent,
    // LocationsComponent,
    // AgentsComponent,
    // ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule

  ],
  providers: [HttpClient, LandingPageComponent, {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}, LoginComponent, MatDialog,],
  bootstrap: [AppComponent]
})
export class AppModule { }
