import { Component } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { PropertiesResponse } from '../interfaces/properties-response';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  searchValues: PropertiesResponse[] | [] = [];

  constructor(private propertiesService: PropertiesService) {}

  ngOnInit() {
    this.propertiesService.observeValues.subscribe({
    next:(val) => {
      console.log(val);
      this.searchValues = val;
    },
    error: (err) =>{
      console.log(err);
    }
  })
  }

}
