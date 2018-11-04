import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from "@angular/router";
import { LoginComponent} from "../../components/user/login/login.component";
import { SignupComponent} from "../../components/user/signup/signup.component";
import { MenuComponent} from "../../components/menu/menu.component";

import { ConeccionService } from "../coneccion.service";
 
const rutas : Routes =[
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:MenuComponent,canActivate:[ConeccionService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(rutas),
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
