import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class ConeccionService implements CanActivate {
  helper=new JwtHelperService();

  canActivate()
  {
    console.log(localStorage.getItem("Token"));
  
      if(localStorage.getItem("Token"))
      {
          return true;
      }
      this.router.navigate(["/login"]);

      
      return false;
  }
  constructor(private router:Router) { }
}
