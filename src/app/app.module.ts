import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FavoritosListComponent } from './components/favoritos-list/favoritos-list.component';
import { HomeComponent } from './views/home/home.component';
import {FavoritoService} from './services/favorito.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing';
import { FavoritoDetailComponent } from './components/favorito-detail/favorito-detail.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import { FavoritoNewComponent } from './components/favorito-new/favorito-new.component';
import {FavoritoEditComponent} from './components/favorito-edit/favorito-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritosListComponent,
    HomeComponent,
    FavoritoDetailComponent,
    FavoritoNewComponent,
    FavoritoEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
