import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string = 'APP FAVORITOS';
  public description: string = 'aplicacion app spa con api en express'
  constructor() { }

  ngOnInit() {
  }

}
