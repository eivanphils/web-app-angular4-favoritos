import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FavoritoService} from '../../services/favorito.service';
import {Favorito} from '../../models/favorito';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/image';
import {ResolveEmit} from '../../interface/resolve-emit';
import {ConfirmSettings} from '../../interface/confirm-settings';
import {ConfirmationService} from '@jaspero/ng2-confirmations';

@Component({
  selector: 'favorito-detail',
  templateUrl: './favorito-detail.component.html',
  styleUrls: ['./favorito-detail.component.css'],
  providers: [FavoritoService, ImageService]
})
export class FavoritoDetailComponent implements OnInit {
  public favorito: any = {};
  public images: Image[];
  public apiUrl: string;
  public settings: ConfirmSettings | any = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Si',
    declineText: 'No',
  };

  constructor(protected _favoritoService: FavoritoService,
              private _imageService: ImageService,
              private _route: ActivatedRoute,
              private  _router: Router,
              private _confirmation: ConfirmationService) {
    this.favorito = new Favorito();
  }

  ngOnInit() {
    this.getFavorito();
    this.apiUrl = this._imageService.getApiUrl('get-image/');
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

          this._imageService.getImages(this.favorito._id).subscribe(
            (res) => {
              console.log('images request', res);
              this.images = res.images;

              console.log('images array', this.images);
            }, (error) => {
              console.log(error;
            });
        },
        (err) => {
            this._router.navigate(['/']);
          console.log('error al recuperar favorito', err);
        }
      );
    });
  }

  removeItem(id) {
    console.log('item a eliminar', id);
    this._confirmation.create('Eliminar item', 'aceptar boones', this.settings)
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved === true) {
          this._imageService.removeImage(id).subscribe(
            (response) => {
              console.log('images elminado', response);
              this.ngOnInit();
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log('decline button clicked');
        }
      });
  }
}
