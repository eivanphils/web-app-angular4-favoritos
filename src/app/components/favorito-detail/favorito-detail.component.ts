import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FavoritoService} from '../../services/favorito.service';
import {Favorito} from '../../models/favorito';

@Component({
  selector: 'favorito-detail',
  templateUrl: './favorito-detail.component.html',
  styleUrls: ['./favorito-detail.component.css'],
  providers: [FavoritoService]
})
export class FavoritoDetailComponent implements OnInit {
  public favorito: any = {};


  constructor(protected _favoritoService: FavoritoService,
              private _route: ActivatedRoute,
              private  _router: Router) {
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
}
