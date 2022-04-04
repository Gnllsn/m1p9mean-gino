import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

import { HomeComponent } from './components/user/home/home.component';
import { ListPlatComponent } from './components/user/list-plat/list-plat.component';
import { CartComponent } from './components/user/cart/cart.component';

const routes: Routes = [{
    path:'',
    component : LoginComponent
},{
    path:'inscription',
    component:InscriptionComponent
},{
    path:'user',
    component:HomeComponent,
    children:[{
        path:'',
        component:ListPlatComponent,
    },{
        path:'cart',
        component:CartComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
