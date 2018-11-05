import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';
export interface Dessert {
  score: number;
  name: string;
}
@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.css']
})
export class PuntuacionesComponent implements OnInit {
  

  constructor() { 
    this.sortedData = this.desserts.slice();
  }

  ngOnInit() {
    /*
    hacer el for para tomar las puntuaciones
    
    */
  }


  desserts: Dessert[] = [
    {name: 'Palbras',score:100},
    {name: 'Palbras',score:50},
    {name: 'Palbras',score:75},
    {name: 'Palbras',score:14},
    {name: 'Palbras',score:20},
    {name: 'Palbras',score:60},
    {name: 'Palbras',score:13},
    {name: 'Matematica',score:20},
    {name: 'Matematica',score:30},
    {name: 'Matematica',score:25},
    {name: 'Matematica',score:100},
    {name: 'Matematica',score:65},
  ];

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
