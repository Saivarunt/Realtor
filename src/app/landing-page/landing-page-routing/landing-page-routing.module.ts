import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../landing-page.component';
import { PropertiesModule } from 'src/app/properties/properties.module';
import { AuthGuard } from 'src/app/auth.guard';



const appRoute: Routes =[
  {
    path:"", component: LandingPageComponent,
    children:[
      {
        path:"properties",loadChildren: () =>
          import('src/app/properties/properties.module')
          .then(out => out.PropertiesModule), canActivate: [AuthGuard]
      },
      {
        path:"locations",loadChildren: () =>
          import('src/app/locations/locations.module')
          .then(out => out.LocationsModule), canActivate: [AuthGuard]
      },
      {
        path:"agents",loadChildren: () =>
          import('src/app/agents/agents.module')
          .then(out => out.AgentsModule), canActivate: [AuthGuard]
      },
      {
        path:"user",loadChildren: () =>
          import('src/app/profile/profile.module')
          .then(out => out.ProfileModule), canActivate: [AuthGuard]
      },
      {
        path:"info",loadComponent: () =>
          import('src/app/users/users.component')
          .then(out => out.UsersComponent), canActivate: [AuthGuard]
      }
    ]
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
export class LandingPageRoutingModule { }
