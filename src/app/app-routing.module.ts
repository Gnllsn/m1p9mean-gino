import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';

import { HomeComponent } from './components/user/home/home.component';
import { ListPlatComponent } from './components/user/list-plat/list-plat.component';
import { CartComponent } from './components/user/cart/cart.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { CommandeComponent } from './components/user/commande/commande.component';

import { RestaurantHomeComponent } from './components/restaurant/restaurant-home/restaurant-home.component';
import { MesCommandesComponent } from './components/restaurant/mes-commandes/mes-commandes.component';
import { MesPlatsComponent } from './components/restaurant/mes-plats/mes-plats.component';
import { AjoutPlatComponent } from './components/restaurant/ajout-plat/ajout-plat.component';
import { ModifierPlatComponent } from './components/restaurant/modifier-plat/modifier-plat.component';
import { ListCommandeComponent } from './components/restaurant/list-commande/list-commande.component';

import { LivreurHomeComponent } from './components/livreur/livreur-home/livreur-home.component';

import { EKalyHomeComponent } from './components/e-kaly/e-kaly-home/e-kaly-home.component';
import { CommandesComponent } from './components/e-kaly/commandes/commandes.component';
import { RestaurantsComponent } from './components/e-kaly/restaurants/restaurants.component';
import { LivreursComponent } from './components/e-kaly/livreurs/livreurs.component';
import { HistoriquesComponent } from './components/e-kaly/historiques/historiques.component';
import { CommandeAsignerComponent } from './components/e-kaly/commande-asigner/commande-asigner.component';
import { CommandeRestautsComponent } from './components/e-kaly/commande-restauts/commande-restauts.component';

const routes: Routes = [{
    path:'',
    component : LoginComponent
},{
    path:'inscription',
    component:InscriptionComponent
},{
    path:'user',
    component:UserHomeComponent,
    children:[{
        path:'',
        component:ListPlatComponent,
    },{
        path:'list-plat',
        component:ListPlatComponent,
    },{
        path:'cart',
        component:CartComponent
    },{
        path:'commande',
        component: CommandeComponent
    }]
},{
    path:'restaurant',
    component:RestaurantHomeComponent,
    children:[{
        path : '',
        component : MesPlatsComponent
    },{
        path : 'mes-plats',
        component : MesPlatsComponent
    },{
        path : 'mes-commandes',
        component : MesCommandesComponent
    },{
        path : 'ajout-plat',
        component : AjoutPlatComponent
    },{
        path : 'modifier-plat/:id',
        component : ModifierPlatComponent
    },{
        path : 'list-commande',
        component : ListCommandeComponent
    }]
},{
    path:'livreur',
    component:LivreurHomeComponent
},{
    path:'admin',
    component:EKalyHomeComponent,
    children : [{
        path : '',
        component : CommandesComponent
    },{
        path : 'commandes',
        component : CommandesComponent
    },{
        path : 'restaurants',
        component : RestaurantsComponent
    },{
        path : 'livreurs',
        component : LivreursComponent
    },{
        path : 'historiques',
        component : HistoriquesComponent
    },{
        path : 'commande-asigner/:id_livreur',
        component : CommandeAsignerComponent
    },{
        path : 'commande-restauts/:id_restaut',
        component : CommandeRestautsComponent
    }]
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
