import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

    save : any = {
        data : {}
    }

    commandes : any ;

    status : any = {
        'en cours Livraison' : 'Livrer et payer'
    }

    constructor(private api : ApiService) { }

    ngOnInit(): void {
        this.getCommandes_user();
    }

    getCommandes_user(){
        const success = (response:any) => {
            if(response.status == 200){
                this.commandes = response.data ;
                this.init_save_data();
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getCommandes_user().subscribe(success,error); 
    }  

    init_save_data(){
        for(let commande of this.commandes){
            this.save.data[commande._id] = false ; 
        }
    }  

    livrer_payer(commande:any){
        const success = (response:any) => {
            if(response.status == 200){
                window.location.reload()
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.save.data[commande._id] = true ; 
        this.api.livrer_payer(commande).subscribe(success,error); 
    }

    get loading(){
        return !this.commandes
    }

}
