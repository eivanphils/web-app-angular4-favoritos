import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Image} from '../models/image';

@Injectable()
export class ImageService {
  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = 'http://localhost:3000/api/';
  }

  getApiUrl(segment = null) {
    return this.url + segment;
  }

  public getImages(favoritoId: string = null): Observable<Image[]> {
    if (favoritoId == null) {
      return this._http.get(this.url + 'images')
        .map(res => res.json());
    } else {
      return this._http.get(this.url + 'images/' + favoritoId)
        .map(res => res.json());
    }
  }
  public getImage(imageId: string): Observable<Image> {
    return this._http.get(this.url + 'image/' + imageId)
      .map(res => res.json());
  }
  public saveImage(body: Image): Observable<Image> {
    return this._http.post(this.url + 'image', body)
      .map(res => res.json());
  }
  public updateImage(imageId: string, body: Image): Observable<Image> {
    return this._http.put(this.url + 'image/' + imageId , body)
      .map(res => res.json());
  }
  public removeImage(imageId: string): Observable<Image> {
    return this._http.delete(this.url + 'image/' + imageId)
      .map(res => res.json());
  }
}

