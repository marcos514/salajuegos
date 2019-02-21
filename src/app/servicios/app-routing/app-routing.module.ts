import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from "@angular/router";
import { LoginComponent} from "../../components/user/login/login.component";
import { SocioComponent} from "../../socio/socio.component";
import { MesasComponent} from "../../mozo/mesas/mesas.component";
import { PedidosComponent} from "../../mozo/pedidos/pedidos.component";
import { PedirComponent} from "../../mozo/pedir/pedir.component";
import { LibresComponent} from "../../comanda/libres/libres.component";
import { AceptadosComponent} from "../../comanda/aceptados/aceptados.component";
import { ClienteComponent} from "../../cliente/cliente.component";




import { PuntuacionesComponent} from "../../puntuaciones/puntuaciones.component";
import { SalirComponent} from "../../salir/salir.component";

import { ConeccionService } from "../coneccion.service";
import { MozoService } from "../mozo.service";
import { SocioService } from "../socio.service";
import { ComandaService } from "../comanda.service";
 
const rutas : Routes =[
  // {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"salir",component:SalirComponent},
  {path:"cliente",component:ClienteComponent},
  {path:"mozo/mesas",component:MesasComponent,canActivate:[ConeccionService,MozoService ]},
  {path:"mozo/pedidos",component:PedidosComponent,canActivate:[ConeccionService,MozoService]},
  {path:"mozo/pedidos/:mesa",component:PedirComponent,canActivate:[ConeccionService,MozoService]},
  {path:"comanda/libres",component:LibresComponent,canActivate:[ConeccionService,ComandaService]},
  {path:"comanda/aceptados",component:AceptadosComponent,canActivate:[ConeccionService,ComandaService]},
  {path:"socio",component:SocioComponent,canActivate:[ConeccionService,SocioService]}
  // {path:"score",component:SocioComponent,canActivate:[ConeccionService]},
  // {path:"tateti",component:TatetiComponent,canActivate:[ConeccionService]},
  // {path:"palabras",component:PalabrasComponent,canActivate:[ConeccionService]},
  // {path:"math",component:MathComponent,canActivate:[ConeccionService]},
  // {path:"inicio",component:InicioComponent,canActivate:[ConeccionService]},
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
