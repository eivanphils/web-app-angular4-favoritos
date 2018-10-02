import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Favorito} from '../models/favorito';

@Injectable()
export class FavoritoService {
  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = 'http://localhost:3000/api/';
}

  public getFavoritos(): Observable<Favorito[]> {
    return this._http.get(this.url + 'favoritos')
      .map(res => res.json());
  }

  public getFavorito(id: string): Observable<Favorito> {
    return this._http.get(this.url + 'favorito/' + id)
      .map(res => res.json());
  }

  public saveFavorito(body): Observable<Favorito> {
    return this._http.post(this.url + 'favorito', body)
      .map(res => res.json());
  }

  public updateFavorito(body, id): Observable<Favorito> {
    console.log('id in service', id)
    return this._http.put(this.url + 'favorito/' + id , body)
      .map(res => res.json());
  }

}
