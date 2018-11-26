import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/servicios/server.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-palabras',
  templateUrl: './palabras.component.html',
  styleUrls: ['./palabras.component.css']
})
export class PalabrasComponent implements OnInit {
  tiles: Tile[];

  lista = [
    "manzana",
    "pera",
    "leon",
    "montaña",
    "amor",
    "juego",
    "palabra",
    "amigo",
    "mesa",
    "marcos",
    "rey"
  ];
  palabra="";
  numero;
  respuesta="";

  aux=100;
  ganador=false
  constructor(private http:ServerService) { }

  ngOnInit() {
    this.aux=100;
    this.ganador=false;
    this.numero= Math.floor(Math.random() * 9);
    this.respuesta="";

    this.palabra =this.lista[this.numero].split("").sort(function() {return Math.random() - 0.5}).toString();
    this.tiles=[ 
      {text: "Palabras Magicas", cols: 3, rows: 1, color: 'whitesmoke'},
      {text: this.palabra, cols: 3, rows: 1, color: '#fffb00'}
    ]
    setTimeout(()=>this.timeWhatch(),100)

  }

  timeWhatch() {
    if(this.aux>0){
      this.aux -= 0.10;
      if(this.aux<=0 && ! this.ganador){
        this.Perder();
        this.aux=0;
        return 0;
      }
      if(!this.ganador){
        setTimeout(()=>this.timeWhatch(),100);
      }
    }
  }

  Perder(){
    this.tiles=[ 
      {text: "Palabras Magicas", cols: 3, rows: 1, color: 'whitesmoke'},
      {text: "PERDISTE ERA: "+this.lista[this.numero], cols: 3, rows: 1, color: 'red'}
    ]
    this.ganador=true;
    this.http.AgregarPuntuacion("Palabra", "Perdiste: "+ this.palabra).subscribe()

  }

  Comprobar(){
    if(this.ganador)
    {
      return 0
    }
    if(this.respuesta.toLowerCase()==this.lista[this.numero]){
      this.Ganar();
      return 0;
    }
    this.Perder()
  }

  Ganar(){
    this.tiles=[ 
      {text: "Palabras Magicas", cols: 3, rows: 1, color: 'whitesmoke'},
      {text: "Ganaste", cols: 3, rows: 1, color: 'green'}
    ]
    this.ganador=true;
    this.http.AgregarPuntuacion("Palabra"," "+ this.aux).subscribe()


  }

}
