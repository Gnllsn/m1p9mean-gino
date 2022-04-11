import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-livreur-home',
    templateUrl: './livreur-home.component.html',
    styleUrls: ['./livreur-home.component.scss']
})
export class LivreurHomeComponent implements OnInit {

    

    constructor(
        private router: Router,
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
                this.getLivreur();
            }

        }
    }

    getLivreur(){
        // const success = (response:any) => {
        //     if(response.status == 200){
        //         this.plats = response.data ;
        //     } else {
        //         console.log(response);
        //     }
        // }
        // const error = (response:any) => {
        //     console.log (response) ; 
        // }
        // this.api.getPlats_user().subscribe(success,error); 
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/'])
    }
}
