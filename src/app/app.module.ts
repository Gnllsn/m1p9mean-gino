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

@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    HomeComponent,
    ListPlatComponent,
    CartComponent
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
