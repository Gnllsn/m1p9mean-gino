import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

    commandes : any ;

    status : any = {
        'en cours livraison' : 'Livrer et payer'
    }

    constructor(private api : ApiService) { }

    ngOnInit(): void {
        this.getCommandes_user();
    }

    getCommandes_user(){
        const success = (response:any) => {
            if(response.status == 200){
                this.commandes = response.data ;
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getCommandes_user().subscribe(success,error); 
    }    

    get loading(){
        return !this.commandes
    }

}
