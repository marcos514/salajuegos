import { Component, OnInit } from '@angular/core';
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
    "amigo"
  ];
  palabra="";
  numero;
  constructor() { }

  ngOnInit() {
  this.numero= Math.floor(Math.random() * 8);

  this.palabra =this.lista[this.numero].split("").sort(function() {return Math.random() - 0.5}).toString();
  this.tiles=[ {text: this.palabra, cols: 3, rows: 1, color: 'white'},
]
 

  }

}
