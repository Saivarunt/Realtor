import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties.component';
import { PropertiesRoutingModule } from './properties-routing/properties-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SelleractionsComponent } from '../selleractions/selleractions.component';
import { MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PropertiesBackgroundDirective } from '../directives/properties-background.directive';
import { SellerPermissionsDirective } from '../directives/seller-permissions.directive';




@NgModule({
  declarations: [PropertiesComponent, SelleractionsComponent, PropertiesBackgroundDirective, SellerPermissionsDirective],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class PropertiesModule { }
