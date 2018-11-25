import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';
import { ServerService } from "../servicios/server.service";

export interface Puntuacion {
  id: number;
  juego: string;
  mail: string;
  puntuacion: string;
}
@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.css']
})
export class PuntuacionesComponent implements OnInit {
  puntuacion:Puntuacion[]=[];
  mostrarArr:Puntuacion[]=[];

  constructor(private http:ServerService) {
    
  }

  ngOnInit() {
    this.http.TomarPuntuacion().subscribe(data=>{
      console.log(data);
      for (let index = 0; index < data["puntuacion"].length; index++) {
        console.log(data["puntuacion"][index]);
        this.puntuacion.push(data["puntuacion"][index]);
      }
    },
    err=>{console.log(err);});
    console.log(this.puntuacion)
   
    this.mostrarArr = this.puntuacion;
  }




  sortData(sort: Sort) {
    const data = this.puntuacion.slice();
    if (!sort.active || sort.direction === '') {
      this.mostrarArr = data;
      return;
    }

    this.mostrarArr = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.juego, b.juego, isAsc);
        case 'score': return compare(a.puntuacion, b.puntuacion, isAsc);
        default: return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
