import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router) { }
  tiles: Tile[]=[
    {text: "Palabras", cols: 3, rows: 1, color: '#e100ff'},
    {text: "Agilidad Aritmetica", cols: 3, rows: 1, color: '#9dff00'},
    {text: "Ta - Te - Ti", cols: 3, rows: 1, color: '#00ffd5'},
    
  ];

  juego(juego:string){
    switch (juego) {
      case "Palabras":
    this.router.navigate(["/palabras"]);

        
        break;
      case "Ta - Te - Ti":
    this.router.navigate(["/tateti"]);
        
        break;
      case "Agilidad Aritmetica":
    this.router.navigate(["/math"]);
        
        break;
    
      default:
        break;
    }
  }

  ngOnInit() {
  }

}
