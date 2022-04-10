import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HomeComponent } from './components/user/home/home.component';
import { ListPlatComponent } from './components/user/list-plat/list-plat.component';
import { CartComponent } from './components/user/cart/cart.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { RestaurantHomeComponent } from './components/restaurant/restaurant-home/restaurant-home.component';
import { LivreurHomeComponent } from './components/livreur/livreur-home/livreur-home.component';
import { EKalyHomeComponent } from './components/e-kaly/e-kaly-home/e-kaly-home.component';
import { MesPlatsComponent } from './components/restaurant/mes-plats/mes-plats.component';
import { MesCommandesComponent } from './components/restaurant/mes-commandes/mes-commandes.component';
import { AjoutPlatComponent } from './components/restaurant/ajout-plat/ajout-plat.component';
import { ModifierPlatComponent } from './components/restaurant/modifier-plat/modifier-plat.component';
import { ConfirmCommandeComponent } from './components/user/confirm-commande/confirm-commande.component';
import { CommandeComponent } from './components/user/commande/commande.component';

@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    HomeComponent,
    ListPlatComponent,
    CartComponent,
    UserHomeComponent,
    RestaurantHomeComponent,
    LivreurHomeComponent,
    EKalyHomeComponent,
    MesPlatsComponent,
    MesCommandesComponent,
    AjoutPlatComponent,
    ModifierPlatComponent,
    ConfirmCommandeComponent,
    CommandeComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
