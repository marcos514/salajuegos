import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//animationes de Angular materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from "./materials";
import { SignupComponent,FaltaCamposComponent } from './components/user/signup/signup.component';
import { LoginComponent,MailErrorComponent, NoPassComponent } from './components/user/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { SnakeComponent } from './components/juegos/snake/snake.component';
import { MathComponent } from './components/juegos/math/math.component';
import { AppRoutingModule } from "./servicios/app-routing/app-routing.module";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from "./servicios/server.service";
import { ConeccionService } from "./servicios/coneccion.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MenuComponent,
    SnakeComponent,
    MathComponent,
    MailErrorComponent,
    NoPassComponent,
    FaltaCamposComponent
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
    FaltaCamposComponent
]
})
export class AppModule { }
