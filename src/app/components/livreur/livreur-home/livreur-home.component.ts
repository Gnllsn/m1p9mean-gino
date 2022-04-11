import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-livreur-home',
    templateUrl: './livreur-home.component.html',
    styleUrls: ['./livreur-home.component.scss']
})
export class LivreurHomeComponent implements OnInit {

    livraisons : any ;
    loading : any = {
        data : true,
        save : {}
    }

    status : any = {
        "en attente" : "en cours Livraison"
    }

    constructor(
        private router: Router,
        private api : ApiService,
        private tools: ToolsService
        ){}

    ngOnInit(): void {
        if(!localStorage.getItem("user")){
            this.router.navigate(['/'])
        }else{
            const data = this.tools.get("user");
            if(data?.user?.role?.nom != "livreur"){
                this.router.navigate(['/'])
            }else{
                this.getLivraison_livreur();
            }
        }
        console.log(this.tools.get("user"))
    }

    getLivraison_livreur(){
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
        this.api.getLivraison_livreur().subscribe(success,error); 
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
        console.log (livraison)
        this.api.en_livraison(livraison).subscribe(success,error);   
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/'])
    }
}
