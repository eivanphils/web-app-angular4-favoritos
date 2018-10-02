import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Favorito} from '../../models/favorito';
import {FavoritoService} from '../../services/favorito.service';

@Component({
  selector: 'favorito-edit',
  templateUrl: './favorito-edit.component.html',
  styleUrls: ['./favorito-edit.component.css'],
  providers: [FavoritoService]
})
export class FavoritoEditComponent implements OnInit {
  public favorito: Favorito;
  constructor(
    private _favoritoService: FavoritoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.favorito = new Favorito();
  }

  ngOnInit() {
    this.getFavorito();
  }

  getFavorito() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._favoritoService.getFavorito(id).subscribe(
        (response) => {
          this.favorito = response.favorito;
          if (!this.favorito) {
            this._router.navigate(['/']);
          }
          console.log('favorito request', response);
        },
        (err) => {
          this._router.navigate(['/']);
          console.log('error al recuperar favorito', err);
        }
      );
    });
  }

  saveFavorito() {
    console.log('favorito a guardar', this.favorito);
    this._favoritoService.updateFavorito(this.favorito, this.favorito._id).subscribe(
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
