import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Favorito} from '../../models/favorito';
import {FavoritoService} from '../../services/favorito.service';

@Component({
  selector: 'favorito-new',
  templateUrl: './favorito-new.component.html',
  styleUrls: ['./favorito-new.component.css'],
  providers: [FavoritoService]
})
export class FavoritoNewComponent implements OnInit {
  public favorito: Favorito;
  constructor(
    private _favoritoService: FavoritoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.favorito = new Favorito();
  }

  ngOnInit() {
  }

  saveFavorito() {
    console.log('favorito a guardar', this.favorito);
    this._favoritoService.saveFavorito(this.favorito).subscribe(
      (response) => {
        console.log('siniestro guardado', response);
        this._router.navigate(['/']);
      },(err) => {
        console.log('error al guardar un favorito', err);
        alert('error al guardar un favorito');
      }
    );
  }
}
