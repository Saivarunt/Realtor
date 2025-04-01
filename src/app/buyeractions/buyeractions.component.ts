import { Component, Inject } from '@angular/core';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgentService } from '../services/agent.service';
import { CookieService } from 'ngx-cookie-service';
import { PropertiesService } from '../services/properties.service';
import { Router } from '@angular/router';
import { PropertiesResponse } from '../interfaces/properties-response';
import { AgentResponse } from '../interfaces/agent-response';


@Component({
  selector: 'app-buyeractions',
  templateUrl: './buyeractions.component.html',
  styleUrls: ['./buyeractions.component.sass']
})
export class BuyeractionsComponent {

  currentPropertySelection: PropertiesResponse | null = null;
  agents: AgentResponse[] = [];
  
  selectedAgentId:number = 0;
  selectedAgentDetails: AgentResponse | null = null;

  buyer: boolean = sessionStorage.getItem("BUYER") === "true";
  admin: boolean = sessionStorage.getItem("ADMIN") === "true";

  constructor(private router:Router, private cookieService: CookieService, private propertiesService: PropertiesService, 
    private landingComponent: LandingPageComponent, private agentService: AgentService,  
    public dialogRef: MatDialogRef<BuyeractionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{currentPropertySelection: PropertiesResponse | null;},) { }

    ngOnInit() {

      this.currentPropertySelection = this.data.currentPropertySelection;

      this.agentService.getAllAgents()
      .subscribe({
        next: (response) =>{
          // console.log("agents",response);
          this.agents = response;
          console.log(this.agents);
          
        },
        error:(error) => {
          // console.log(error);
          alert("Error Fetching Details");
        }
      })
    }

    setAgent(agentId: string) {
      this.selectedAgentId = parseInt(agentId);
      this.selectedAgentDetails = this.agents.filter((agent) => {
        return agent.agentId === this.selectedAgentId;
      })[0]
    }

    buyProperty() {
      this.agentService.createAssociation(this.selectedAgentId)
      .subscribe({
        next: (response) =>{
          console.log(response);

          this.propertiesService.buyProperty(this.selectedAgentId, this.currentPropertySelection!.propertyId)
          .subscribe({
            next: (response) =>{
              console.log(response);
              this.router.navigate(["/home"])
            },
            error:(error) => {
              console.log(error);
              alert("Error Fetching Details");
            }
          })
          
        },
        error:(error) => {
          console.log(error);
          alert("Error Fetching Details");
        }
      })
  
    }
}
