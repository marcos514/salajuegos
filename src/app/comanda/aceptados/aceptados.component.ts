import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { ServerService } from 'src/app/servicios/server.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginComponent, NoPassComponent, ErrorServerComponent } from '../../components/user/login/login.component';



export interface UserData {
  id: string,
  pedido: string,
  descripcion: string,
  mozo: string,
  cliente: string,
  terminar:string
}
export interface DialogData {
  id: string;
  cliente: string;
}
@Component({
  selector: 'app-aceptados',
  templateUrl: './aceptados.component.html',
  styleUrls: ['./aceptados.component.css']
})
export class AceptadosComponent implements OnInit {

  pedidos:any;
  displayedColumns: string[] = ['id', 'pedido', 'descripcion', 'mozo', 'cliente',"terminar"];
  dataSource: MatTableDataSource<UserData>;

  id: string;
  cliente: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public dialog: MatDialog, public snackBar: MatSnackBar) {

  }
  
  

  mover(ruta){
    this.router.navigate([ruta]);
  }
  ngOnInit() {
      this.http.PedidoAceptados().subscribe(data=>{
      this.pedidos = data; 
      this.dataSource = new MatTableDataSource(this.pedidos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      //INFO
    });
  }

  Terminar(id){
    this.http.PedidoTerminar(id).subscribe(data=>{
      //INFO
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

  



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

