import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-restaurant-home',
    templateUrl: './restaurant-home.component.html',
    styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {

        user: any;
    constructor(
        private router: Router,
        private tools: ToolsService
    ){}

    ngOnInit(): void {
        if(!localStorage.getItem("user")){
            this.router.navigate(['/'])
        }else{
            const data = this.tools.get("user");
            if(data?.user?.role?.nom != "restaurant")this.router.navigate(['/'])
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
