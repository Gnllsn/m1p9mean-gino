import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-commande-restauts',
    templateUrl: './commande-restauts.component.html',
    styleUrls: ['./commande-restauts.component.scss']
})
export class CommandeRestautsComponent implements OnInit {

    loading : any = {
        data : true,
        pret : {} 
    }
    commandes : any ;

    status : any = {
        'en cours de preparation' : 'Prêt'
    }

    constructor(
        private api : ApiService,
        private activeRoute : ActivatedRoute,
        private tools : ToolsService    
        ) {}

    ngOnInit(): void {
        this.getCommandes_restaurant(this.activeRoute.snapshot.paramMap.get("id_restaut"));
    }

    getCommandes_restaurant(id:any){
        const success = (response:any) =>{
            if(response.status == 200){
                this.commandes = response.data ;
                this.init_pret();  
                this.loading.data = false ; 
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.loading.data = true ;
        this.api.getCommandes_restaurant_by_id(id).subscribe(success,error)
    }

    init_pret(){
        for(let commande of this.commandes){
            this.loading.pret[commande._id] = false;
        }
    }

    pret(commande:any){
        const success = (response:any) =>{
            if(response.status == 200){
                window.location.reload();
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.loading.pret[commande._id] = true ;
        this.api.pret(commande._id).subscribe(success,error)
    }
}
