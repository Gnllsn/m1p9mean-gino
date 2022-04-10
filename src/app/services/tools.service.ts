import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor() { }

    formOptionJSON (use_authorization = false) {
        const options:any = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };
        if (use_authorization) {
            options['headers']['authorization'] = this.get("user").token ;
        }
        return options;
    }

    store(storageKey : string , data : any) {
        const crypteValue = btoa(escape(JSON.stringify(data)));
        localStorage.setItem(storageKey,crypteValue);
    }
    
    get(storageKey : string){
        const res = localStorage.getItem(storageKey);
        if (res) {
            return JSON.parse(unescape(atob(res)));
        }else{
            return false;
        }
    }
}
