import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ServerService } from '../servicios/server.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { NoPassComponent, ErrorServerComponent } from '../components/user/login/login.component';

export interface UserData {
 id:string,pedido:string, descripcion:string,comienzo:string,finEsperado:string
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  mesa;
  pedido;

  users:any;
  displayedColumns: string[] = ['id', 'pedido', 'descripcion', 'comienzo', 'finEsperado'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http:ServerService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  Pedido(){
    this.http.PedidoCliente(this.mesa,this.pedido).subscribe(data=>{
      this.users=data;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

