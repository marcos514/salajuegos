import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ServerService } from "../../../servicios/server.service";
import { MailErrorComponent,NoPassComponent } from "../login/login.component";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email="";
  apellido="";
  nombre="";
  password="";
  constructor(public snackBar: MatSnackBar,private http:ServerService) { }

  ngOnInit() {
  }

  Logearse(){
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!emailRegex.test(this.email))
    {
      this.mailMal();
      return 0;
    }
    if (!this.password) 
    {
      this.noPass();
      return 0;
    }
    if(!this.nombre)
    {
      this.faltaCampos();
      return 0;
    }
    if( !this.apellido )
    {
      this.faltaCampos();
      return 0;
    }

    this.http.SignUp(this.nombre,this.apellido,this.email,this.password).subscribe(data=>{
      console.log(data);
      localStorage.setItem("Token",data["token"]);
    },
    err=>{console.log(err);});
    if(localStorage.getItem("Token")){
      
    }
    return 0;
    
   }


   faltaCampos() {
    /*this.snackBar.open(msn,icono, {
      duration: 2000,
    });*/
    this.snackBar.openFromComponent(FaltaCamposComponent,{
      duration: 1000,
    });
  }
  mailMal() {
    /*this.snackBar.open(msn,icono, {
      duration: 2000,
    });*/
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

}

@Component({
  selector: 'falta-campos',
  templateUrl: 'falta-campos.html',
  styles: [`
    .example-pizza-party {
      color: red;
    }
  `],
})
export class FaltaCamposComponent {}

