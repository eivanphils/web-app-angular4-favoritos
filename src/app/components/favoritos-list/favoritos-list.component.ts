import { Component, OnInit } from '@angular/core';
import {FavoritoService} from '../../services/favorito.service';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ResolveEmit } from '../../interface/resolve-emit';
import { ConfirmSettings } from '../../interface/confirm-settings';

@Component({
  selector: 'favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrls: ['./favoritos-list.component.css'],
  providers: [FavoritoService]
})
export class FavoritosListComponent implements OnInit {
  public favoritos: any;
  public settings: ConfirmSettings | any = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Si',
    declineText: 'No',
  };

  constructor(
    protected _favoritoService: FavoritoService,
    private _confirmation: ConfirmationService
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
    this._confirmation.create('Example confirm button', 'Test confirmation button', this.settings)
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved === true) {
          this._favoritoService.removeFavorito(id).subscribe(
            (response) => {
              console.log('favorito elminado', response);
              this.getFavoritos();
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
