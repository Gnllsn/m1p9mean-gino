import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

    user : any ;

    constructor(
        private router : Router,
        private tools : ToolsService
        ) { }

    ngOnInit(): void {
        if(!localStorage.getItem("user")){
            this.router.navigate(['/'])
        }else{
            const data = this.tools.get("user");
            if(data?.user?.role?.nom != "client")this.router.navigate(['/'])
                else{                                
                    this.user = this.tools.get("user").user

                }
        }
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/'])
    }

}
