import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http : HttpClient,
        private tools : ToolsService
    ){}

    getRoles(){
        return this.http.get(environment.base_url+"role");    
    }

    getTypes(){
        return this.http.get(environment.base_url+"type");    
    }

    register(data:any){
        return this.http.post(environment.base_url+"auth/register",data);
    }

    login(data:any){
        return this.http.post(environment.base_url+"auth/login",data);
    }

    save_plat(data:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"restaurant/ajout-plat",data,options);
    }
}
