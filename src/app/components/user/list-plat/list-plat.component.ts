import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-list-plat',
    templateUrl: './list-plat.component.html',
    styleUrls: ['./list-plat.component.scss']
})
export class ListPlatComponent implements OnInit {

    plats : any ; 
    types : any ; 
    restauts : any ; 
    restauts_for_join : any ; 

    constructor(
        private tools : ToolsService,
        private api : ApiService,
        ){}

    ngOnInit(): void {
        this.getPlats_user();
        this.getTypes();
        this.getRestauts();
    }

    getPlats_user(){
        const success = (response:any) => {
            if(response.status == 200){
                this.plats = response.data ;
                console.log(this.plats)
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getPlats_user().subscribe(success,error); 
    }

    getTypes(){
        const success = (response:any) => {
            if(response.status == 200){
                this.types = response.data ;
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getTypes().subscribe(success,error)
    }

    getRestauts(){
        const success = (response:any) => {
            if(response.status == 200){
                this.restauts = response.data ;
                this.Join_Restaut();
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getRestauts().subscribe(success,error)
    }

    Join_Restaut(){
        this.restauts_for_join = {} ;
        for(let restaut of this.restauts){
            this.restauts_for_join[restaut._id] = restaut;
        } 
    }

    get loading(){
        return !this.plats || !this.types || !this.restauts;
    }

}
