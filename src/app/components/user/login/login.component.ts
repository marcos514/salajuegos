import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { ServerService } from "../../../servicios/server.service";
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre="";
  clave="";
  helper=new JwtHelperService();

  constructor(public snackBar: MatSnackBar,private http:ServerService,private router:Router) {}

  usrMal(){
    this.snackBar.openFromComponent(MailErrorComponent,{
      duration: 1000,
    });
  }
  noPass() {
    /*this.snackBar.open(msn,icono, {
      duration: 2000,
    });*/
    this.snackBar.openFromComponent(NoPassComponent,{
      duration: 1000,
    });
  }

  ngOnInit() {
  }

  
  Logearse(){
    if(this.nombre){
      if (this.clave) 
      {
        this.http.LogIn(this.nombre,this.clave).subscribe(data=>{
          console.log(data);
          localStorage.setItem("Token",data["token"]);

        let token =localStorage.getItem("Token");
        if(token)
        {
          let usr :any = this.helper.decodeToken(token);
          if(usr.tipo=="socio"){
            this.router.navigate(["/socio"]);

          }
          else if(usr.tipo=="mozo"){
            this.router.navigate(["/mozo/mesas"]);
          }
          else{
            this.router.navigate(["/comanda/libres"]);

          }
        return false;

      }
          this.router.navigate(["/separar"]);
       },err=>{
        this.usrMal();
        this.noPass();
       })
      } 
      else 
      {
        this.noPass()
      }
    }
    else{
      this.usrMal();  
    }
    
   }

}



@Component({
  selector: 'mail-error',
  templateUrl: 'mail-error.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class MailErrorComponent {}

@Component({
  selector: 'no-pass',
  templateUrl: 'no-pass.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class NoPassComponent {}

@Component({
  selector: 'error-server',
  templateUrl: 'error-server.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class ErrorServerComponent {}