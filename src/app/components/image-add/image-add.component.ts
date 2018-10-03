import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/image';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
  providers: [ImageService]
})
export class ImageAddComponent implements OnInit {
  public image: Image;
  constructor(
    private _imageService: ImageService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.image = new Image();
  }

  ngOnInit() {

  }

  saveImage() {
    console.log('image a guardar', this.image);
    this._route.params.forEach((params: Params) => {
      const favoritoId = params['favoritoId'];
      this.image.favorito = favoritoId;
      this._imageService.saveImage(this.image).subscribe(
        (response) => {
          this.image = response.image;
          if (!response.image) {
            alert('error en el servid444or');
          } else {
            this._router.navigate(['editar-imagen', response.image._id]);
          }
          console.log('siniestro guardado', response);
        },(err) => {
          console.log('error al guardar un favorito', err);
          alert('error al guardar un favorito');
        }
      );

    });
  }

}
