import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ServerService } from 'src/app/servicios/server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ErrorServerComponent } from '../components/user/login/login.component';

export interface UserData {
  id: string,
  mozo: string,
  cliente: string,
  codigo: string,
  estado: string,
  pagar : null
}


export interface DialogData {
  precio: string;
}

export interface EncuestaData {
  mesa:string;
  mozo:string; restaurant:string;cocinero:string;comentario:string;
}
@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']
})
export class SocioComponent implements OnInit {
  users:any;
  displayedColumns: string[] = ['id', 'mozo', 'cliente', 'codigo', 'estado', "pagar"];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public dialog: MatDialog, private route: ActivatedRoute, public snackBar: MatSnackBar) {

    // Create 100 users
    

    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
      this.http.MesasTodas().subscribe(data=>{
      this.users = data; 
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
//INFO
      this.snackBar.openFromComponent(ErrorServerComponent,{
        duration: 1000,
      });
    });





  }

  cerrar(mesa){
    if(mesa.estado == "con clientes pagando"){
      this.http.Factura(mesa.id).subscribe(data=>{
        console.log(data);
        const dialogRef = this.dialog.open(FacturaDialog, {
          width: '250px',
          data: {precio: data}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
            const dat = this.dialog.open(EncuestaDialog, {
              width: '250px',
              data: {precio: ""}
            });
        
            dat.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              console.log(result);
              
              this.http.Encuesta(result.mesa,result.mozo,result.restaurant,result.cocinero,result.comentario,mesa.id,mesa.mozo).subscribe(ret=>{
                if(data){
                  this.http.MesaCerrar(mesa.id).subscribe(data=>{
                    //informar
                    if(data){
                      this.ngOnInit();
                    }
                 },err=>{
                  //INFO
                  this.snackBar.openFromComponent(ErrorServerComponent,{
                    duration: 1000,
                  });
                  });
                }
                else{
                  this.snackBar.openFromComponent(ErrorServerComponent,{
                    duration: 1000,
                  });
                }
              })
              
            });
          
        });
        
      });
      
    }




  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}




@Component({
  selector: 'factura',
  templateUrl: 'factura.html',
})
export class FacturaDialog {

  constructor(
    public dialogRef: MatDialogRef<FacturaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaDialog {

  constructor(
    public dialogRef: MatDialogRef<EncuestaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EncuestaData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}