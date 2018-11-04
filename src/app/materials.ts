import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [MatSnackBarModule,MatGridListModule,MatTableModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,MatInputModule],
  exports: [MatSnackBarModule,MatGridListModule,MatTableModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,MatInputModule],
})
export class MaterialsModule { }