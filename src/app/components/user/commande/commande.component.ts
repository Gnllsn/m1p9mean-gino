import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

    commandes : any ;
    restauts : any ;

    constructor(private api : ApiService) { }

    ngOnInit(): void {
        this.getCommandes_user();
        this.getRestauts()
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

    getRestauts(){
        const success = (response:any) => {
            if(response.status == 200){
                this.Join_Restaut(response.data);
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getRestauts().subscribe(success,error)
    }

    Join_Restaut(data:any){
        this.restauts = {} ;
        for(let restaut of data){
            this.restauts[restaut._id] = restaut;
        } 
    }

    get loading(){
        return !this.restauts || !this.commandes
    }

}
