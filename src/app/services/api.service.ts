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

       mes_plats(){
           const options = this.tools.formOptionJSON(true);
           return this.http.get(environment.base_url+"restaurant/mes-plats",options);        
       }

       getPlat(id:any){
           const options = this.tools.formOptionJSON(true);
           return this.http.get(environment.base_url+"restaurant/plat/"+id,options);                
       }

       update_plat(id:any,data:any){
           const options = this.tools.formOptionJSON(true);
           return this.http.put(environment.base_url+"restaurant/plat/"+id,data,options);
       }

       supprimer_plat(id:any){
           const options = this.tools.formOptionJSON(true);
           return this.http.delete(environment.base_url+"restaurant/plat/"+id,options);        
       }

       getPlats_user(){
           const options = this.tools.formOptionJSON(true);
           return this.http.get(environment.base_url+"user",options);                
       }

       getRestauts(){
           const options = this.tools.formOptionJSON(true);
           return this.http.get(environment.base_url+"restaurant",options);                
       }

       save_command(data:any){
           const options = this.tools.formOptionJSON(true);
           return this.http.post(environment.base_url+"user/commande",data,options);                
       }
   }

