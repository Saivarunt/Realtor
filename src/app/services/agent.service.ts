import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgentResponse } from '../interfaces/agent-response';
import { AgentAssociation } from '../interfaces/agent-association';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private url:string = environment.backendBaseUrl;

  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  getAllAgents() : Observable<AgentResponse[]>{
    let response:Observable<AgentResponse[]> = this.http.get<AgentResponse[]>(`${this.url}/agent/`);
    return response;
  }

  getAllAgentsPageable(page: number) : Observable<Pageable>{
    let response:Observable<Pageable> = this.http.get<Pageable>(`${this.url}/agent/by-page/?page=${page}`);
    return response;
  }


  getAgentProfile(id: string|null): Observable<AgentResponse>{
    let response:Observable<AgentResponse> = this.http.get<AgentResponse>(`${this.url}/agent/by-user-id/${id}`);
    return response;
  }

  createAssociation(agentId: number ): Observable<HttpResponse<AgentAssociation>> {
    let response:Observable<HttpResponse<AgentAssociation>> = this.http.post<AgentAssociation>(`${this.url}/agent/select-agent/${agentId}`, {price:0}, {observe:'response'});
    return response;
  }
}
