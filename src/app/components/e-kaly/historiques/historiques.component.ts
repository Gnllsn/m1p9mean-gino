import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-historiques',
    templateUrl: './historiques.component.html',
    styleUrls: ['./historiques.component.scss']
})
export class HistoriquesComponent implements OnInit {

    commandes : any ;
    total : number = 0 ; 

    constructor(private api : ApiService) { }

    ngOnInit(): void {
        this.getHistory()
    }

    getHistory(){
       const success = (response:any) =>{
            if(response.status == 200){
                this.commandes = response.data ;
                this.count_total()
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.api.getHistory().subscribe(success,error) 
    }

    count_total(){
        for(let commande of this.commandes){
            this.total += commande.quantite*commande.plat.prix ;  
        }
    }

}
