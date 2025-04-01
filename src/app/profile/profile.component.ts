import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { UserResponse } from '../interfaces/user-response';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AgentService } from '../services/agent.service';
import { AgentResponse } from '../interfaces/agent-response';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {

  user: UserResponse | null = null;
  agentDetails: AgentResponse | null = null;

  agent: boolean = sessionStorage.getItem("AGENT") === "true";
  admin: boolean = sessionStorage.getItem("ADMIN") === "true";

  formResponse = this.fb.group({
      "username":[this.user?.username || ""],
      "fullname":[this.user?.fullname || "", [Validators.minLength(2)]],
      "email": [this.user?.email || "", [Validators.email]],
      "phonenumber": [this.user?.phonenumber || "",[Validators.min(0), Validators.minLength(10)]]
  })


  constructor(private router:Router, private cookieService: CookieService, private userService :UserService,
     private landingComponent: LandingPageComponent, private agentService: AgentService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.landingComponent.inHome = false;
     this.userService.getUserInfo()
    .subscribe({
      next: (response) =>{
        console.log("user",response);
        this.user = response;
        console.log(this.user);
        
      },
      error:(error) => {
        console.log(error);
        alert("Error Fetching Details");
      }
    })

    if(this.agent){
      this.agentService.getAgentProfile(sessionStorage.getItem("u_id"))
      .subscribe({
        next: (response) => {
          console.log("agent prof ", response);
          this.agentDetails = response;
        },
        error:(error) => {
          console.log(error);
          alert("Error Fetching Details");
        }
      })
    }
  }

  
  backHome(){
    this.landingComponent.inHome = true;
    this.router.navigate(['/home'])
  }

  updateUserDetails() {
    console.log("form ",this.formResponse.value);
    
    if(!this.formResponse.invalid){
    
      this.userService.updateUserInfo(this.user?.username || "", this.formResponse.get("fullname")?.value, this.formResponse.get("email")?.value, this.formResponse.get("phonenumber")?.value)
      .subscribe({
        next: (response) => {
          console.log("updated user info", response);
          this.user = response.body;

          this.router.navigate(["/home"])
        },
        error:(error) => {
          console.log(error);
          alert("Error Fetching Details");
        }
      })
    
    }
    else{
      alert("Invalid inputs!")
    }
  }
}
