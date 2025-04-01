import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { PermissionsResponse } from '../interfaces/permissions-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  hide:boolean = true;
  isAdmin: boolean = sessionStorage.getItem('ADMIN') === "true";
  isAgent: boolean = sessionStorage.getItem('AGENT') === "true";
  isBuyer: boolean = sessionStorage.getItem('BUYER') === "true";
  isSeller: boolean = sessionStorage.getItem('SELLER') === "true";


  formResponse = this.fb.group({
    username:["",[Validators.required, Validators.minLength(1)]],
    password:["",[Validators.required, Validators.minLength(1)]]
  })

  constructor (private authService : AuthService, private router:Router, private cookieService: CookieService, private landingComponent:LandingPageComponent,
    private fb: FormBuilder) {}

  loginResponseFunction() {
    console.log(this.formResponse.value);
    
    if(!this.formResponse.invalid){
      this.authService.loginUser(this.formResponse.get('username')?.value,this.formResponse.get('password')?.value)
      .subscribe({
        next: (response) => {

          if(response.status === 200) {
            this.cookieService.set("logged_in","true");
            
            let token: string = response.body!.jwt;
            sessionStorage.setItem("jwt", token);
            
            let u_id:string = response.body!.user.userId.toString();
            sessionStorage.setItem("u_id",u_id);
  
            let username: string = response.body!.user.username;
            sessionStorage.setItem("username",username);
            
            let authorities:[{ roleId: number; authority: string; }]= response.body!.user.authorities;
  
            for(let i = 0 ; i < authorities.length; i++){
              sessionStorage.setItem(authorities[i].authority,"true")
            }
  
                    
            this.isAdmin = sessionStorage.getItem('ADMIN') === "true";
            this.isAgent = sessionStorage.getItem('AGENT') === "true";
            this.isBuyer = sessionStorage.getItem('BUYER') === "true";
            this.isSeller = sessionStorage.getItem('SELLER') === "true";
  
            this.authService.isLoggedIn = true;
            this.landingComponent.hasLoggedIn = true;

            this.authService.getAllPermissions(u_id)
            .subscribe({
              next: (response) => {

                let permission: string[] | [] = response.map((val) =>{                  
                  return val.permission;
                }) || []
                
                this.authService.changeValues(permission);
                sessionStorage.setItem("Permissions", JSON.stringify(permission) )
              },
              error:(error) => {
                console.log(error);
                alert("Enter Valid Credentials");
              }
            })

          }
          else{
            throw new HttpErrorResponse({headers:response.headers,status:response.status,url:response.url?.toString()});
          }


        },
        error:(error) => {
          console.log(error);
          alert("Enter Valid Credentials");
        },
        complete: () => {
          this.router.navigate(['home']);
        }
      })

    }
    else{
      alert("Enter Valid Credentials or Register if you don't have an account!")
    }

  }
}


