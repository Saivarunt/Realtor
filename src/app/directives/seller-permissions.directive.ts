import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PermissionsResponse } from '../interfaces/permissions-response';

@Directive({
  selector: '[appSellerPermissions]'
})
export class SellerPermissionsDirective {
  permissionsFromSession:string[];
  
  constructor(private authService: AuthService, private el:ElementRef, private renderer: Renderer2) {
    this.el.nativeElement.hidden = false;
    this.permissionsFromSession = JSON.parse(sessionStorage.getItem("Permissions") || "");
    authService.changeValues(this.permissionsFromSession);
   }

  permissions!:string [] ;

  ngOnInit() {
    this.authService.observeValues
    .subscribe({
      next: (val:string[]) =>{
        // this.permissions = val;

        console.log(val);
        
        let access = val.filter((permissionObj) => {
          
          return permissionObj === "UPDATE_PROPERTY" || permissionObj === "SELL_PROPERTY"
        }).length > 0
        
        if(!access){
          console.log("Hiding now");
          
          this.el.nativeElement.hidden = true;
        }
      },
      error:(error) => {
        console.log(error);
        alert("NOT ACCESSABLE");
      },
    })
  }
}
