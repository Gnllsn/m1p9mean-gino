import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-e-kaly-home',
    templateUrl: './e-kaly-home.component.html',
    styleUrls: ['./e-kaly-home.component.scss']
})
export class EKalyHomeComponent implements OnInit {

    user : any ; 

    constructor(private router: Router,private tools: ToolsService){}

    ngOnInit(): void {
        if(!localStorage.getItem("user")){
            this.router.navigate(['/'])
        }else{
            const data = this.tools.get("user");
            if(data?.user?.role?.nom != "Admin"){
                this.router.navigate(['/'])
            }else {
                this.user = this.tools.get("user").user
            }
        }
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/'])
    }

}
