import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';
import { ServerService } from "../servicios/server.service";

export interface Dessert {
  score: string;
  name: string;
}
@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.css']
})
export class PuntuacionesComponent implements OnInit {
  puntuaciones = "";

  constructor(private http:ServerService) {
    this.http.TomarPuntuacion().subscribe(data=>{
      console.log(data);
      this.puntuaciones=data["puntuacion"];
    },
    err=>{console.log(err);});
    for (let index = 0; index < this.puntuaciones.length; index++) {
      this.desserts.push({"name":  this.puntuaciones[index]["juego"],"score": this.puntuaciones[index["puntuacion"]]});
    }
    this.sortedData = this.desserts.slice();
  }

  ngOnInit() {
    /*
    hacer el for para tomar las puntuaciones
    
    */
  }


  desserts: Dessert[] = [];

  sortedData: Dessert[];


  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'score': return compare(a.score, b.score, isAsc);
        default: return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
