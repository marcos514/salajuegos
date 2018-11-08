import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


const CONFIG={headers:new HttpHeaders({token:localStorage.getItem("Token")})};
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http:HttpClient) { }
  public LogIn(email,pass)
  {
    let datos= "{'mail':"+email+",'clave':"+pass+"}";
    return this.http.post("http://localhost:8080/Api_Juegos/usuario/login",{json:datos});
  }

  public SignUp(nombre:string,apellido:string,email:string,pass:string)
  {
    let datos= "{'mail':'"+email+"','clave':'"+pass+"','nombre':'"+nombre+"','apellido':'"+apellido+"'}";
    return this.http.post("http://localhost:8080/Api_Juegos/usuario/signup",{mail:"saaa-----sa", clave: "123", nombre: "wqwq", apellido: "dsds"});
  }

  public AgregarPuntuacion(juego:string, puntuacion:string)
  {

    return this.http.post("localhost:8080/Api_Juegos/puntuacion",{json:{juego:juego,puntuacion:puntuacion}},CONFIG);
  }

  public TomarPuntuacion()
  {
    return this.http.get("localhost:8080/Api_Juegos/puntuacion",CONFIG);
  }
}
