import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { ServerService } from 'src/app/servicios/server.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ErrorServerComponent } from 'src/app/components/user/login/login.component';



export interface UserData {
  id: string,
  mozo: string,
  cliente: string,
  codigo: string,
  estado: string,
  pagar : null
}
export interface DialogData {
  id: string;
  cliente: string;
}

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  users:any;
  displayedColumns: string[] = ['id', 'mozo', 'cliente', 'codigo', 'estado', "pagar"];
  dataSource: MatTableDataSource<UserData>;

  id: string;
  cliente: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public dialog: MatDialog,public snackBar: MatSnackBar) {

  }
  
  Alta(mesa): void {
    if(mesa.estado!="libre"){
      return;
    }
    this.id = mesa.id;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {cliente: this.cliente, id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cliente = result;
      if(!result){
        return 0;
      }
      this.http.MesaAlta(mesa.id,this.cliente).subscribe(data=>{
        if(data){
          this.ngOnInit();
        }
      })
    });
  }
  mover(ruta){
    this.router.navigate([ruta]);
  }
  ngOnInit() {
      this.http.MesasTodas().subscribe(data=>{
      this.users = data; 
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      //INFO
    });
  }

  Pedido(mesa){
    if(mesa.estado!="libre"&& mesa.estado!="con clientes pagando"){
      this.router.navigate(["mozo/pedidos/"+mesa.id])
    }
  }

  MesaComiendo(mesa){
    if(mesa.estado!="libre"&& mesa.estado!="con clientes pagando"){
      this.http.MesaComiendo(mesa.id).subscribe(data=>{
        if(data){
          this.ngOnInit();
        }
        else{
          this.snackBar.openFromComponent(ErrorServerComponent,{
            duration: 1000,
          });
        }
      },err=>{
        this.snackBar.openFromComponent(ErrorServerComponent,{
          duration: 1000,
        });
      });
    }
  }

  MesaPaga(mesa){
    if(mesa.estado!="libre"&& mesa.estado!="con clientes pagando"){
      this.http.MesaPagando(mesa.id).subscribe(data=>{
        if(data){
          this.ngOnInit();
        }
        else{
          this.snackBar.openFromComponent(ErrorServerComponent,{
            duration: 1000,
          });
        }
      },err=>{
        this.snackBar.openFromComponent(ErrorServerComponent,{
          duration: 1000,
        });
      });
    }
  }

  cerrar(row){
    console.log(row);
    return true;
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


@Component({
  selector: 'agregar',
  templateUrl: 'agregar.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}