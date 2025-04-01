import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  // formResponse = {
  //   username:"",
  //   password:""
  // }

  registrationType:string = "";
  constructor (private authService : AuthService, private router:Router, private regitserService: RegisterService, private fb: FormBuilder) {}

  formResponse = this.fb.group({
    username:["",[Validators.required, Validators.minLength(1)]],
    password:["",[Validators.required, Validators.minLength(1)]]
  })

  registrationTypeSet (type:string) {
    this.registrationType = type;
  }

  regitserResponseFunction () {

    console.log(this.formResponse.value);
    
    if(this.registrationType === "Agent" && !this.formResponse.invalid){

      this.regitserService.registerAgent(this.formResponse.get('username')?.value,this.formResponse.get('password')?.value)

      .subscribe({
        next: (response) => {
          console.log("backend response",response);

          if(response.status !== 200) {
            throw new HttpErrorResponse({headers:response.headers,status:response.status,url:response.url?.toString()});
          }

        },

        error:(error) => {
          console.log(error);
          alert("Duplicate Credentials or Invalid input");
        },

        complete: () => {
          this.router.navigate(['login']);
        }

      })

    }
    else if(this.registrationType === "Buyer" && !this.formResponse.invalid) {

      this.regitserService.registerBuyer(this.formResponse.get('username')?.value,this.formResponse.get('password')?.value)

      .subscribe({

        next: (response) => {
          console.log("backend response",response);

          if(response.status !== 200) {
            throw new HttpErrorResponse({headers:response.headers,status:response.status,url:response.url?.toString()});
          }

        },

        error:(error) => {
          console.log(error);
          alert("Duplicate Credentials or Invalid input");
        },

        complete: () => {
          this.router.navigate(['login']);
        }

      })

    }
    else if(this.registrationType === "Seller" && !this.formResponse.invalid){

      this.regitserService.registerSeller(this.formResponse.get('username')?.value,this.formResponse.get('password')?.value)

      .subscribe({

        next: (response) => {
          console.log("backend response",response);

          if(response.status !== 200) {
            throw new HttpErrorResponse({headers:response.headers,status:response.status,url:response.url?.toString()});
          }

        },

        error:(error) => {
          console.log(error);
          alert("Duplicate Credentials or Invalid input");
        },

        complete: () => {
          this.router.navigate(['login']);
        }

      })

    }
    else{
      alert("Pick a registration type and check inputs provided!")
    }
  }

}
