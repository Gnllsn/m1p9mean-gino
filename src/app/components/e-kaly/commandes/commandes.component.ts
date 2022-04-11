import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';
import { MatDialog} from '@angular/material/dialog' ; 

@Component({
    selector: 'app-commandes',
    templateUrl: './commandes.component.html',
    styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {

    loading : any = {
        data : true ,
        asigner : {}
    }
    commandes : any  ; 
    status : any = {
        'Prêt' : 'Assigner Livreur'
    }

    constructor(
        private api : ApiService,
        private dialog : MatDialog,
        private tools : ToolsService
        ) {}

    ngOnInit(): void {
        this.getCommandes_admin();
    }

    getCommandes_admin(){
        const success = (response:any) =>{
            if(response.status == 200){
                this.commandes = response.data ;  
                this.init_asigner();
                this.loading.data = false ; 
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.loading.data = true ; 
        this.api.getCommandes_admin().subscribe(success,error)
    }

    init_asigner(){
        for(let commande of this.commandes){
            this.loading.asigner[commande._id] = false ; 
        }
    }

    asigner_livraison(commande:any){
        const success = (response:any) =>{
            if(response.status == 200){
                window.location.reload()
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.loading.asigner[commande._id] = true ; 
        this.api.asigner_livraison(commande).subscribe(success,error)
    }

}
