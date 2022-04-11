import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-commande-asigner',
    templateUrl: './commande-asigner.component.html',
    styleUrls: ['./commande-asigner.component.scss']
})
export class CommandeAsignerComponent implements OnInit {

    livraisons : any ;
    loading : any = {
        data : true,
        save : {}
    }
    id_livreur : any ;
    status : any = {
        "en attente" : "en cours Livraison"
    }
    constructor(
        private router: Router,
        private api : ApiService,
        private activeRoute : ActivatedRoute,
        private tools: ToolsService
        ){}

    ngOnInit(): void {
        this.getLivraison_livreur(this.activeRoute.snapshot.paramMap.get("id_livreur"));
    }

    getLivraison_livreur(id:any){
        const success = (response:any) => {
            if(response.status == 200){
                this.livraisons = response.data ;
                this.init_en_livraison()
                this.loading.data = false ; 
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getLivraison_livreur_by_id(id).subscribe(success,error); 
    }

    init_en_livraison(){
        for(let livraison of this.livraisons){
            this.loading.save[livraison._id] = false
        }
    }

    en_livraison(livraison:any){
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
        this.loading.save[livraison._id] = true ;
        this.api.en_livraison(livraison).subscribe(success,error);   
    }

}
