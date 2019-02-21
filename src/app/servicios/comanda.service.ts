import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ComandaService implements CanActivate{
  helper=new JwtHelperService();

  canActivate()
  {
      let token =localStorage.getItem("Token");
      if(token)
      {
        let usr :any = this.helper.decodeToken(token);
        if(usr.tipo=="bar"|| usr.tipo=="cerveza" || usr.tipo=="candy"|| usr.tipo=="cocina" ){
          return true;
        }
      }
      this.router.navigate(["/login"]);

      
      return false;
  }
  constructor(private router:Router) { }
}
