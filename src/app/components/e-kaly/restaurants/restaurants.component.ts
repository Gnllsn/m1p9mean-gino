import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

    restauts : any ;

    constructor(
        private api : ApiService
        ) { }

    ngOnInit(): void {
        this.getRestauts();
    }

    getRestauts(){
        const success = (response:any) =>{
            if(response.status == 200){
                this.restauts = response.data ;
            }else{
                console.log (response)
            }
        }
        const error = (response:any)=>{
            console.log (response)
        }
        this.api.getRestauts().subscribe(success,error)
    }

}
