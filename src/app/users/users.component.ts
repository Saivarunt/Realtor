import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RegisterResponse } from '../interfaces/register-response';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule,MatPaginatorModule],
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  totalElements:number = 0;
  pageIndex = 0;
  pageSize = 10;

  users: RegisterResponse[] = []
  constructor(private userService:UserService) {}


  userDisplay(page: number) {
    this.userService.getAllUserInfo(page)
    .subscribe({
      next:(response) =>{
          this.users = response.content;
          this.totalElements = response.totalElements;
          this.pageSize = response.size;
      },
      error: (err) =>{
        console.log(err);
        alert("Error fetching details");
      }
    })
  }

  ngOnInit() {
    this.userDisplay(this.pageIndex);
  }


  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.userDisplay(this.pageIndex);
  }
}
