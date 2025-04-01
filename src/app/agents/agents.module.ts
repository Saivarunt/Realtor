import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from './agents.component';
import { AgentsRoutingModule } from './agents-routing/agents-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [AgentsComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class AgentsModule { }
