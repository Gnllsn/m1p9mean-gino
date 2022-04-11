import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-livreurs',
    templateUrl: './livreurs.component.html',
    styleUrls: ['./livreurs.component.scss']
})
export class LivreursComponent implements OnInit {

    livreurs : any ;
    constructor(
        private api : ApiService) { }

    ngOnInit(): void {
        this.getLivreurs()
    }

    getLivreurs(){
        const success = (response:any) =>{
            if(response.status == 200){
                this.livreurs = response.data ;
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.api.getLivreurs().subscribe(success,error)
    }

}
