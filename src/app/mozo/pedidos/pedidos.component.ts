import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/servicios/server.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ErrorServerComponent } from 'src/app/components/user/login/login.component';




export interface UserData {
  pedido: string,
  id: string,
  mesa: string,
  descripcion: string,
  cliente: string,
  codigo: string,
  estado: string,
  mozo: string,
}
export interface DialogData {
  id: string;
  cliente: string;
}
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos:any;
  displayedColumns: string[] = [  'pedido','id','mesa','descripcion','cliente','codigo','estado','mozo'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public snackBar: MatSnackBar) {

  }
  
  mover(ruta){
    this.router.navigate([ruta]);
  }

  ngOnInit() {
      this.http.PedidoMios().subscribe(data=>{
      this.pedidos = data; 
      this.dataSource = new MatTableDataSource(this.pedidos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
