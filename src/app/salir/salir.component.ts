import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    localStorage.setItem("Token","");
    this.router.navigate(["/login"]);
  }

}
