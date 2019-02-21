import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { ServerService } from 'src/app/servicios/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ErrorServerComponent } from 'src/app/components/user/login/login.component';



export interface ProdData {
  id: string,
  precio: string,
  descripcion: string,
  sector: string,
  agregar : null
}
export interface DialogData {
  clave: string;
}
@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent implements OnInit {

  productos:any;
  productosElegidos:any[];
  displayedColumns: string[] = ['id', 'precio', 'descripcion', 'sector', 'agregar'];
  dataSource: MatTableDataSource<ProdData>;
  id:string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:ServerService, private router:Router, public dialog: MatDialog,private route: ActivatedRoute, public snackBar: MatSnackBar) {

  }
  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("mesa");
    this.productosElegidos=[];
    this.http.ProductoTodas().subscribe(data=>{
      this.productos = data; 
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      //INFO
    });
  }

  Agregar(prodId:string){
    this.productosElegidos.push(prodId);
  }

  mover(ruta){
    this.router.navigate([ruta]);
  }
  
  Pedir(){
    console.log(this.id);
    this.http.PedidoAlta(this.id,this.productosElegidos.join(",")).subscribe(data=>{
      //comparar la cantidad de pedidos y hechos
      if(data){
        const dialogRef = this.dialog.open(DialogCodigo, {
          width: '250px',
          data: {clave: data, id: this.id}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.http.MesaEsperar(this.id).subscribe(data=>{
            this.router.navigate(["mozo/mesas"]);
          },err=>{
            //INFO
            this.snackBar.openFromComponent(ErrorServerComponent,{
              duration: 1000,
            });
          });
        });

      }
      else{
        //INFO
        this.snackBar.openFromComponent(ErrorServerComponent,{
          duration: 1000,
        });
      }
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



@Component({
  selector: 'codigo',
  templateUrl: 'codigo.html',
})
export class DialogCodigo {

  constructor(
    public dialogRef: MatDialogRef<DialogCodigo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}