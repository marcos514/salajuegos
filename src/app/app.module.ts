import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//animationes de Angular materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from "./materials";
import { SignupComponent,FaltaCamposComponent } from './components/user/signup/signup.component';
import { LoginComponent,MailErrorComponent, NoPassComponent,ErrorServerComponent } from './components/user/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MathComponent } from './components/juegos/math/math.component';
import { AppRoutingModule } from "./servicios/app-routing/app-routing.module";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from "./servicios/server.service";
import { ConeccionService } from "./servicios/coneccion.service";
import { TatetiComponent,XComponent,OComponent } from './components/juegos/tateti/tateti.component';
import { PalabrasComponent } from './components/juegos/palabras/palabras.component';
import { InicioComponent } from './inicio/inicio.component';
import { PuntuacionesComponent } from './puntuaciones/puntuaciones.component';
import { SalirComponent } from './salir/salir.component';
import { MesasComponent, DialogOverviewExampleDialog } from './mozo/mesas/mesas.component';
import { PedidosComponent } from './mozo/pedidos/pedidos.component';
import { LibresComponent,DialogOverviewHoraDialog } from './comanda/libres/libres.component';
import { AceptadosComponent } from './comanda/aceptados/aceptados.component';
import { SocioComponent,FacturaDialog, EncuestaDialog } from './socio/socio.component';
import { PedirComponent,DialogCodigo } from './mozo/pedir/pedir.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MenuComponent,
    MathComponent,
    MailErrorComponent,
    NoPassComponent,
    FaltaCamposComponent,
    TatetiComponent,
    XComponent,
    OComponent,
    PalabrasComponent,
    InicioComponent,
    PuntuacionesComponent,
    SalirComponent,
    MesasComponent,
    PedidosComponent,
    LibresComponent,
    AceptadosComponent,
    SocioComponent,
    PedirComponent,
    DialogOverviewExampleDialog,
    DialogOverviewHoraDialog,
    ClienteComponent,
    ErrorServerComponent,
    DialogCodigo,
    FacturaDialog,
    EncuestaComponent,
    EncuestaDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ServerService,ConeccionService],
  bootstrap: [AppComponent],
  entryComponents: [
    MailErrorComponent,
    NoPassComponent,
    FaltaCamposComponent,
    XComponent,
    OComponent,
    DialogOverviewExampleDialog,
    DialogOverviewHoraDialog,
    ErrorServerComponent,
    DialogCodigo,
    FacturaDialog,
    EncuestaDialog
]
})
export class AppModule { }
