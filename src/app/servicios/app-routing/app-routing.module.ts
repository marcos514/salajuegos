import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from "@angular/router";
import { LoginComponent} from "../../components/user/login/login.component";
import { SignupComponent} from "../../components/user/signup/signup.component";
import { PuntuacionesComponent} from "../../puntuaciones/puntuaciones.component";
import { InicioComponent} from "../../inicio/inicio.component";
import { MathComponent} from "../../components/juegos/math/math.component";
import { PalabrasComponent} from "../../components/juegos/palabras/palabras.component";
import { TatetiComponent} from "../../components/juegos/tateti/tateti.component";
import { SalirComponent} from "../../salir/salir.component";

import { ConeccionService } from "../coneccion.service";
 
const rutas : Routes =[
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"salir",component:SalirComponent},
  {path:"score",component:PuntuacionesComponent,canActivate:[ConeccionService]},
  {path:"tateti",component:TatetiComponent,canActivate:[ConeccionService]},
  {path:"palabras",component:PalabrasComponent,canActivate:[ConeccionService]},
  {path:"math",component:MathComponent,canActivate:[ConeccionService]},
  {path:"inicio",component:InicioComponent,canActivate:[ConeccionService]},
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
