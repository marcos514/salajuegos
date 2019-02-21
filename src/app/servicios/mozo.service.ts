import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class MozoService implements CanActivate{
  helper=new JwtHelperService();

  canActivate()
  {
      let token =localStorage.getItem("Token");
      console.log(token);
      if(token)
      {
        let usr :any = this.helper.decodeToken(token);
        console.log(usr);
        if(usr.tipo=="mozo"){
          return true;
        }
      }
      this.router.navigate(["/login"]);

      
      return false;
  }
  constructor(private router:Router) { }
}
