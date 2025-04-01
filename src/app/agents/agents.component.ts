import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AgentService } from '../services/agent.service';
import { AgentResponse } from '../interfaces/agent-response';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LoginComponent } from '../login/login.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../interfaces/pageable';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {
  agents: AgentResponse[] | null = null;
  buyer: boolean = sessionStorage.getItem("BUYER") === "true";
  admin: boolean = sessionStorage.getItem("ADMIN") === "true";

  paginationValues: Pageable | null = null; 


  totalElements:number = 0;
  pageIndex = 0;
  pageSize = 10;

  
  constructor(private router:Router, private cookieService: CookieService, private agentService :AgentService, private landingComponent: LandingPageComponent, private loginComponent: LoginComponent) { }

  agentsDisplay(page:number) {
    this.agentService.getAllAgentsPageable(page)
    .subscribe({
      next: (response) =>{
        console.log("agents",response);
        this.paginationValues = response;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.agents = response.content;
        console.log(this.agents);
        
      },
      error:(error) => {
        console.log(error);
        alert("Error Fetching Details");
      }
    })
  }

  ngOnInit() {
    // this.landingComponent.inHome = false;
    this.agentsDisplay(this.pageIndex)
  }
  
  
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.agentsDisplay(this.pageIndex);
  }
  
  backHome(){
    this.landingComponent.inHome = true;
    this.router.navigate(['/home'])
  }
}
