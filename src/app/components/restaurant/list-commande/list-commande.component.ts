import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-list-commande',
    templateUrl: './list-commande.component.html',
    styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

    loading : any = {
        data : true 
    }
    commandes : any ;

    status : any = {
        'en cours preparation' : 'Prêt'
    }

    constructor(
        private api : ApiService,
        private tools : ToolsService    
        ) {}

    ngOnInit(): void {
        this.getCommandes_restaurant();
    }

    getCommandes_restaurant(){
        const success = (response:any) =>{
            if(response.status == 200){
                this.commandes = response.data ;  
                this.loading.data = false ; 
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.loading.data = true ; 
        this.api.getCommandes_restaurant().subscribe(success,error)
    }

}
