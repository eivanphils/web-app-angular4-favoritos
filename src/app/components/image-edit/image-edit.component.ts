import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/image';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css'],
  providers: [ImageService]
})
export class ImageEditComponent implements OnInit {
  public image: Image;
  public resultUploads;
  public filesToUpload: Array<File>;
  constructor(
    private _imageService: ImageService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.image = new Image();
  }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this._route.params.forEach((params: Params) => {
      const id = params['imageId'];
      this._imageService.updateImage(id, this.image).subscribe(
        (response) => {
          this.image = response.image;
          if (!response.image) {
            this._router.navigate(['/']);
          }
          console.log('this ', this.image.favorito)
          // this._router.navigate(['/favorito', this.image.favorito]);
          console.log('siniestro guardado', response);
        },(err) => {
          console.log('error al guardar un favorito', err);
          alert('error al guardar un favorito');
        }
      );
    });
  }

  saveImage() {
    this._route.params.forEach((params: Params) => {
      const id = params['imageId'];
      this._imageService.updateImage(id, this.image).subscribe(
        (response) => {
          this.image = response.image;
          if (!response.image) {
            alert('error en el servidor');
          } else {
            const url = 'http://localhost:3000/api/upload-image/' + id;
            this.makeFileRequest(url, [], this.filesToUpload)
              .then((result) => {
                console.log(this.filesToUpload);
                console.log('this.resultUploads,',result);

                this.resultUploads = result;
                this.image.picture = this.resultUploads.filename;
              },
                (error) => {
                console.log(error);
                });
          }
        }, (err) => {
          console.log('error al guardar un favorito', err);
        }
      );
    });
  }

  fileChangeEvent(fileInput: any) {
   this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise(function(resolve, reject){
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

}
