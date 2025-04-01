import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { PropertiesComponent } from './properties/properties.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  // {path:"", redirectTo:'login', pathMatch:'full'},

  // {path:"home", component: LandingPageComponent, canActivate: [AuthGuard]},

  {
    path:"home",loadChildren: () =>
      import('./landing-page/landing-page.module')
      .then(out => out.LandingPageModule), canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
