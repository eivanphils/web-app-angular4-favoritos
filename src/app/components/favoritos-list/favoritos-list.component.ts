import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FavoritoService} from '../../services/favorito.service';
import {Favorito} from '../../models/favorito';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrls: ['./favoritos-list.component.css'],
  providers: [FavoritoService]
})
export class FavoritosListComponent implements OnInit {
  public favoritos: any;
  constructor(
    protected _favoritoService: FavoritoService
  ) { }

  ngOnInit() {
    this.getFavoritos();
  }

  public getFavoritos() {
    this._favoritoService.getFavoritos().subscribe(
      (response) => {
          this.favoritos = response.favoritos;
          console.log('favoritos', this.favoritos);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeItem(id) {
    console.log('item a eliminar', id);
  }
}
