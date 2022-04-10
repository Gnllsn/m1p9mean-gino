import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-mes-plats',
    templateUrl: './mes-plats.component.html',
    styleUrls: ['./mes-plats.component.scss']
})
export class MesPlatsComponent implements OnInit {

    plats : any = [] ;
    loading : boolean = true ;

    constructor(
        private api : ApiService,
        private tools : ToolsService,
    ) { }

    ngOnInit(): void {
        this.mes_plats();
    }

    mes_plats(){
        const success = (response:any) => {
            if(response.status == 200){
                this.plats = response.data ;
                this.loading = false ; 
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.mes_plats().subscribe(success,error);    
    }

    supprimer_plat(id:any){
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
        this.api.supprimer_plat(id).subscribe(success,error); 
    }

}
