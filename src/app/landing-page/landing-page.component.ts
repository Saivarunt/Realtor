import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { PropertiesService } from '../services/properties.service';
import { PropertiesResponse } from '../interfaces/properties-response';
import { Pageable } from '../interfaces/pageable';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  // styleUrls: ['./landing-page.component.css'],
  styles :[`
  .landing{
    background: linear-gradient(135deg,#ffd4d4,#5c95ff);
    display: flex;
    justify-content: space-between;
    margin:50px;
    margin-top:5px;
    flex-wrap: wrap;
    flex-direction: row;
    align-self: center;
    height:200px;
  }
.container{
    /* width: 95%; */
    /*min-height: 20%;*/
    /*background: linear-gradient(135deg,#ffd4d4,#5c95ff);*/
    padding: 5px;
    margin: 10px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    flex-direction: row;
    align-self: center;
}

.card{
    width:100px;
    height: 100px;
    /*margin: 100px auto 0;*/
    perspective:1000px ;
    /* background: #fff; */
}

.card-inner{
    width: 100%;
    height:100%;
    position:relative;
    transition: transform 1s;
    transform-style: preserve-3d;
}

.front,.back{
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    backface-visibility: hidden;
}


.front{
    /* background: url('/assets/images.png'); */

    background-color: linear-gradient(135deg,#5c95ff,#ffb1b1);
    background-size: cover;
    background-position: center;
    /* padding:10px; */
    /*display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: black;*/
}

.front > img{
    width: 120px;
    height: 100px;
    border-radius: 10px;
    /*object-fit:fill;*/
}

.front > .logout{
  width: 80px;
  height: 80px;

}

.back{
    background: linear-gradient(135deg,#5c95ff,#ffb1b1);
    color:#fff;
    font-size: 15px;
    /*padding: 10px;*/
    transform:rotateY(180deg);
    /* transform:transition(180deg); */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.back h1{
    font-size: 28px;
    line-height: 55px;
    margin-bottom: 10px;

}
.back h1 span{
    font-weight: 400;
}
.back p{
    font-weight: 14px ;
}
.back p span{
    font-weight: 600;
}
.back img{
    width: 120px;
}
.row{
    display: flex;
    align-items: center;
    margin-top: 30px;
}
.col{
    flex:1;
    text-align: center;
    color:#555;
    font-size:12px;
    position: relative;

}

.col h2{
    font-size: 20px;

}
.col::after{
    content:'';
    width: 1.5px;
    height: 20px;
    background: #7800ad;
    position:absolute;
    top: 5px;
    right:0;
}
.col:last-child::after{
    display: none;
}

.col p{
    margin-top: 5px;
}
.back button{
    background: #ffa6a6b7;
    color: #3d3d3d;
    border: 0;
    outline: 0;
    padding:8px 25px;
    border-radius: 30px;
    font-size: 14px;
    margin-right: 15px;
    box-shadow: 0 8px 10px rgba(120,0,173,0.3);

    justify-content: center;
}

.card:hover .card-inner{
    transform: rotateY(180deg);
}

.text-content{
    color: white;
    font-size: 20px;
    position: absolute;
    bottom: 90%;
    left:50%;
    transform: translate(-50%, -50%);
}
h1{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  align-self: center;
}
  `]
})
export class LandingPageComponent {
  properties: PropertiesResponse[] | null = null;
  hasLoggedIn: boolean = false;
  inHome:boolean = true;
  username:string = sessionStorage.getItem("username") || "User";
  isAdmin = sessionStorage.getItem("ADMIN") === "true";

  searchValues: PropertiesResponse[] | [] = [];
  search: string | null = null;

  constructor(private cookieService: CookieService, private authService: AuthService, private propertiesService: PropertiesService) {
    this.hasLoggedIn = authService.isLoggedIn;
    // console.log("Landing comp:", this.hasLoggedIn);
  }

  
    searchFun() {
        if(this.search != " "){
            this.propertiesService.getAllPropertiesWithName(this.search || "")
            .subscribe({
                next: (value) => {

                    this.propertiesService.changeValues(value);

                },
                error: (err) => {
                    console.log(err); 
                }
            });
        }
  }
  
  // ngOnInit() {
  //   this.propertiesService.getAllProperties(0)
  //   .subscribe({
  //     next: (response) =>{
  //       console.table(response)
  //       // console.log("propeties",response.content);
  //       this.properties = response.content;
  //       // console.log(this.properties);
        
  //     },
  //     error:(error) => {
  //       // console.log(error);
  //       alert("Error Fetching Details");
  //     }
  //   })
  // }

  logoutUser(){
    this.cookieService.deleteAll();
    sessionStorage.clear();
    this.authService.isLoggedIn = false;
    this.hasLoggedIn = false;
  }

  notInHome() {
    this.inHome = false;
  }
}
