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
  aceptar:string
}
export interface DialogData {
  hora: string;
}
@Component({
  selector: 'app-libres',
  templateUrl: './libres.component.html',
  styleUrls: ['./libres.component.css']
})
export class LibresComponent implements OnInit {
  users:any;
  displayedColumns: string[] = ['id', 'pedido', 'descripcion', 'mozo', 'cliente',"aceptar"];
  dataSource: MatTableDataSource<UserData>;

  hora: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public dialog: MatDialog , public snackBar: MatSnackBar) {

  }
  
  Aceptar(id): void {
    const dialogRef = this.dialog.open(DialogOverviewHoraDialog, {
      width: '250px',
      data: {hora: this.hora}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.hora = result;
      if(this.hora){
        var myDate = new Date();
        var minutes = myDate.getMinutes();
        myDate.setDate(minutes + Number(this.hora));

        this.http.PedidoAceptar(myDate.toISOString(),id).subscribe(data=>{
          if(data){
            this.ngOnInit();
          }
        })
      }
      
    });
  }


  mover(ruta){
    this.router.navigate([ruta]);
  }


  
  ngOnInit() {
      this.http.PedidoLibres().subscribe(data=>{
      this.users = data; 
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      //INFO
      this.snackBar.openFromComponent(NoPassComponent,{
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


@Component({
  selector: 'aceptar',
  templateUrl: 'aceptar.html',
})
export class DialogOverviewHoraDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewHoraDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}