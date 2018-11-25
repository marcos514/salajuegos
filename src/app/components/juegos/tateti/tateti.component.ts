import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ServerService } from 'src/app/servicios/server.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  x: number;
  y:number;
}

export interface Titulo {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,private http:ServerService) { }
  turno=true;
  tiles: Tile[];
  player_win="---";


  ganar=[
    [
      1,1,1,
      0,0,0,
      0,0,0
    ],
    [
      0,0,0,
      1,1,1,
      0,0,0
    ],
    [
      0,0,0,
      0,0,0,
      1,1,1
    ],
    [
      1,0,0,
      1,0,0,
      1,0,0
    ],
    [
      0,1,0,
      0,1,0,
      0,1,0
    ],
    [
      0,0,1,
      0,0,1,
      0,0,1
    ],
    [
      1,0,0,
      0,1,0,
      0,0,1
    ],
    [
      0,0,1,
      0,1,0,
      1,0,0
    ]
  ];
  titulo:Titulo[];

  J00={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:0 ,y:0};
  J01={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:0 ,y:1};
  J02={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:0 ,y:2};

  J10={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:1 ,y:0};
  J11={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:1 ,y:1};
  J12={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:1 ,y:2};

  J20={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:2 ,y:0};
  J21={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:2 ,y:1};
  J22={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:2 ,y:2};

  ngOnInit() {
    this.titulo=[
      {text: "TA", cols: 2, rows: 1, color: 'whitesmoke'},
      {text: "O", cols: 1, rows: 1, color: 'whitesmoke'},
      {text: "TE", cols: 3, rows: 1, color: 'whitesmoke'},
      {text: "---", cols: 1, rows: 1, color: 'whitesmoke'},
      {text: "TI", cols: 2, rows: 1, color: 'whitesmoke'},
    ];


    this.tiles=[
      this.J00,this.J01,this.J02,
      this.J10,this.J11,this.J12,
      this.J20,this.J21,this.J22
    ];
  }

  X_winer=[
    0,0,0,
    0,0,0,
    0,0,0,
  ];
  O_winer=[
    0,0,0,
    0,0,0,
    0,0,0,
  ];
  validarGanador(){
    if(this.turno)
    {
      for (let index = 0; index < this.ganar.length; index++) {
        if(this.MarcarArrays(this.O_winer,this.ganar[index])){
          this.player_win="0";
          this.http.AgregarPuntuacion("TA - TE - TI", "Gano los CIRCULOS").subscribe()

          this.snackBar.openFromComponent(OComponent,{
            duration: 10000,
          });

        }
      }
    }
    else{
      for (let index = 0; index < this.ganar.length; index++) {
        if(this.MarcarArrays(this.X_winer,this.ganar[index])){
          this.player_win="x";
          this.http.AgregarPuntuacion("TA - TE - TI", "Gano los Cuadrados").subscribe()

          this.snackBar.openFromComponent(XComponent,{
            duration: 10000,
          });

        }
      }
    }
    
    
  }
  copiarArray(arrayacopiar){
    let arrayCopia=[];
    arrayCopia.push(arrayacopiar[0]);
    arrayCopia.push(arrayacopiar[1]);
    arrayCopia.push(arrayacopiar[2]);
    arrayCopia.push(arrayacopiar[3]);
    arrayCopia.push(arrayacopiar[4]);
    arrayCopia.push(arrayacopiar[5]);
    arrayCopia.push(arrayacopiar[6]);
    arrayCopia.push(arrayacopiar[7]);
    arrayCopia.push(arrayacopiar[8]);
    return arrayCopia;

  }

  MarcarArrays(arrayJugador,ganador)
  {
    let auxArray=this.copiarArray(arrayJugador);
    auxArray[3]=0;
    auxArray[4]=0;
    auxArray[5]=0;
    auxArray[6]=0;
    auxArray[7]=0;
    auxArray[8]=0;
    if(this.compararArrays(auxArray,ganador))
      return true

    auxArray=this.copiarArray(arrayJugador);
    auxArray[0]=0;
    auxArray[1]=0;
    auxArray[2]=0;
    auxArray[6]=0;
    auxArray[7]=0;
    auxArray[8]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[0]=0;
    auxArray[1]=0;
    auxArray[2]=0;
    auxArray[3]=0;
    auxArray[4]=0;
    auxArray[5]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[1]=0;
    auxArray[2]=0;
    auxArray[3]=0;
    auxArray[5]=0;
    auxArray[6]=0;
    auxArray[7]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[0]=0;
    auxArray[1]=0;
    auxArray[3]=0;
    auxArray[5]=0;
    auxArray[7]=0;
    auxArray[8]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[1]=0;
    auxArray[2]=0;
    auxArray[4]=0;
    auxArray[5]=0;
    auxArray[7]=0;
    auxArray[8]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[0]=0;
    auxArray[3]=0;
    auxArray[6]=0;
    auxArray[1]=0;
    auxArray[4]=0;
    auxArray[7]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;

    auxArray=this.copiarArray(arrayJugador);
    auxArray[0]=0;
    auxArray[3]=0;
    auxArray[6]=0;
    auxArray[2]=0;
    auxArray[5]=0;
    auxArray[8]=0;
    if(this.compararArrays(auxArray,ganador))
      return true;
    return false;
  }

  compararArrays(arr1,arr2){
    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  reiniciar(){
    this.J00={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:0 ,y:0};
    this.J01={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:0 ,y:1};
    this.J02={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:0 ,y:2};
  
    this.J10={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:1 ,y:0};
    this.J11={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:1 ,y:1};
    this.J12={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:1 ,y:2};
  
    this.J20={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:2 ,y:0};
    this.J21={text: "---", cols: 3, rows: 1, color: '#f6d4a7',x:2 ,y:1};
    this.J22={text: "---", cols: 3, rows: 1, color: '#a7f6d8',x:2 ,y:2};
    this.turno=true;

    this.X_winer=[
      0,0,0,
      0,0,0,
      0,0,0,
    ];
    this.O_winer=[
      0,0,0,
      0,0,0,
      0,0,0,
    ];
    this.player_win="---";
    this.ngOnInit();
  }


  marcar(x,y,marca){
    if(this.player_win!="---"){
      return 0;
    }
    if(marca!="---"){
      return 0;
    }
    switch (x) {
      case 0:
        switch (y) {
          case 0:
            if(this.turno)
            {
              this.J00["text"]="O";
              this.O_winer[0]=1;
            }
            else
            {
              this.J00["text"]="x";
              this.X_winer[0]=1;
            }
            break;
          case 1:
            if(this.turno)
            {
              this.J01["text"]="O";
              this.O_winer[1]=1;
            }
            else
            {
              this.J01["text"]="x";
              this.X_winer[1]=1;
            }
            break;
          case 2:
            if(this.turno)
            {
              this.J02["text"]="O";
              this.O_winer[2]=1;
            }
            else
            {
              this.J02["text"]="x";
              this.X_winer[2]=1;
            }
            break;
        }  


        break;
      case 1:
      switch (y) {
        case 0:
          if(this.turno)
          {
            this.J10["text"]="O";
            this.O_winer[3]=1;
          }
          else
          {
            this.J10["text"]="x";
            this.X_winer[3]=1;
          }
          break;
        case 1:
          if(this.turno)
          {
            this.J11["text"]="O";
            this.O_winer[4]=1;
          }
          else
          {
            this.J11["text"]="x";
            this.X_winer[4]=1;
          }
          break;
        case 2:
          if(this.turno)
          {
            this.J12["text"]="O";
            this.O_winer[5]=1;
          }
          else
          {
            this.J12["text"]="x";
            this.X_winer[5]=1;
          }
          break;
      } 
        
        break;
      case 2:
      switch (y) {
        case 0:
          if(this.turno)
          {
            this.J20["text"]="O";
            this.O_winer[6]=1;
          }
          else
          {
            this.J20["text"]="x";
            this.X_winer[6]=1;
          }
          break;
        case 1:
          if(this.turno)
          {
            this.J21["text"]="O";
            this.O_winer[7]=1;
          }
          else
          {
            this.J21["text"]="x";
            this.X_winer[7]=1;
          }
          break;
        case 2:
          if(this.turno)
          {
            this.J22["text"]="O";
            this.O_winer[8]=1;
          }
          else
          {
            this.J22["text"]="x";
            this.X_winer[8]=1;
          }
          break;
      } 
        
        break;
    }
    this.validarGanador();


    if(this.turno)
      this.turno=false;
    else
      this.turno=true;
    if(this.turno){
      this.titulo=[
        {text: "TA", cols: 2, rows: 1, color: 'whitesmoke'},
        {text: "O", cols: 1, rows: 1, color: 'whitesmoke'},
        {text: "TE", cols: 3, rows: 1, color: 'whitesmoke'},
        {text: "---", cols: 1, rows: 1, color: 'whitesmoke'},
        {text: "TI", cols: 2, rows: 1, color: 'whitesmoke'},  
      ];
    }
    else{
      this.titulo=[
        {text: "TA", cols: 2, rows: 1, color: 'whitesmoke'},
        {text: "---", cols: 1, rows: 1, color: 'whitesmoke'},
        {text: "TE", cols: 3, rows: 1, color: 'whitesmoke'},
        {text: "X", cols: 1, rows: 1, color: 'whitesmoke'},
        {text: "TI", cols: 2, rows: 1, color: 'whitesmoke'},
      ];
    }

  }
}


@Component({
  selector: 'x',
  templateUrl: 'x.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class XComponent {}

@Component({
  selector: 'O',
  templateUrl: 'O.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class OComponent {}