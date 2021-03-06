import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {FavoritosListComponent} from './components/favoritos-list/favoritos-list.component';
import {FavoritoDetailComponent} from './components/favorito-detail/favorito-detail.component';
import {FavoritoNewComponent} from './components/favorito-new/favorito-new.component';
import {FavoritoEditComponent} from './components/favorito-edit/favorito-edit.component';
import {ImageAddComponent} from './components/image-add/image-add.component';
import {ImageEditComponent} from './components/image-edit/image-edit.component';

const routes: Routes = [
  {path: '', component: FavoritosListComponent},
  {path: 'favorito/:id', component: FavoritoDetailComponent},
  {path: 'crearFavorito', component: FavoritoNewComponent},
  {path: 'agregarFotos/:favoritoId', component: ImageAddComponent},
  {path: 'editar-imagen/:imageId', component: ImageEditComponent},
  {path: 'editFavorito/:id', component: FavoritoEditComponent},
  {path: '**', component: FavoritosListComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
