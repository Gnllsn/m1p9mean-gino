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

    getLivreurs(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"livreur",options);                
    }

    save_command(data:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"user/commande",data,options);                
    }

    getCommandes_user(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"user/commande",options);                
    }

    getCommandes_restaurant(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"restaurant/mes-commandes",options);                           
    }

    getCommandes_admin(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"admin/commandes",options);                           
    }

    pret(id:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"restaurant/pret/"+id,null,options);                                   
    }

    getLivreur(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"admin/livreurs",options);                                   
    }

    asigner_livraison(commande:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"admin/asigner",commande,options);                                   
    }

    getLivraison_livreur(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"livreur/mes-livraisons",options);                                   
    }

    en_livraison(livraison:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"livreur/en-livraison",livraison,options);                                           
    }

    livrer_payer(commande:any){
        const options = this.tools.formOptionJSON(true);
        return this.http.post(environment.base_url+"user/livrer",commande,options);                                                   
    }

    getHistory(){
        const options = this.tools.formOptionJSON(true);
        return this.http.get(environment.base_url+"admin/history",options);                                                           
    }

}

