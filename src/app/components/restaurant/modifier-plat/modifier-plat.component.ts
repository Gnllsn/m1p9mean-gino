import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-modifier-plat',
    templateUrl: './modifier-plat.component.html',
    styleUrls: ['./modifier-plat.component.scss']
})
export class ModifierPlatComponent implements OnInit {

    save : boolean = false ;
    types : any  ;
    form_error : any = {} ; 
    formulaire_Control : any ; 
    error_server : any ;
    id_plat : any ;
    plat : any ;

    constructor(
        private activeRoute : ActivatedRoute,
        private api: ApiService,
        private tools: ToolsService,
        private formBuilder : FormBuilder,
        ) {}

    ngOnInit(): void {
        this.id_plat = this.activeRoute.snapshot.paramMap.get('id');
        this.getTypes()
        this.getPlat();
    }

    init_form_control(){
        this.initform_error();
        this.formulaire_Control = this.formBuilder.group({
            nom : [''+this.plat.nom,[Validators.minLength(4),Validators.required,Validators.pattern('^[a-zA-Z]+.*$')]],
            type : [''+this.plat.type,[Validators.required]],
            prix : [''+this.plat.prix,[Validators.required,Validators.pattern('^[0-9]+$')]]
        });
    }

    initform_error(){
        this.form_error.css = {} ;
        this.form_error.bool = {} ;
        this.form_error.texte = {} ;
        this.init_nom();
        this.init_type();
        this.init_prix();
    }

    init_nom(){
        this.form_error.css.nom = "" ;
        this.form_error.bool.nom = false;
        this.form_error.texte.nom = "" ;
    }

    init_type(){
        this.form_error.css.type = "" ;
        this.form_error.bool.type = false;
        this.form_error.texte.type = "" ;
    }

    init_prix(){
        this.form_error.css.prix = "" ;
        this.form_error.bool.prix = false;
        this.form_error.texte.prix = "" ;
    }

    Control_valeur(){
        this.on_change_nom();
        this.on_change_type();
        this.on_change_prix();
        if (this.formulaire_Control.valid) {
            this.update_plat(this.getData())
        }
    }

    getData(){
        const plat = {
            "nom" : this.formulaire_Control.get("nom").value,
            "type" : this.formulaire_Control.get("type").value,
            "prix" : this.formulaire_Control.get("prix").value,
            "restaut" : this.tools.get("user").user.user._id 
        }
        return plat ;
    }


    update_plat(data:any){
        const success = (response:any) => {
            if(response.status == 200){
                window.location.reload();
            }
            else{
                console.log (response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.save = true ; 
        this.api.update_plat(this.id_plat,data).subscribe(success,error)
    }

    // ______________ on change input ________________________________

    on_change_nom(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.nom.errors?.pattern || this.formulaire_Control.controls.nom.errors?.required){
            this.form_error.bool.nom = true ; 
            this.form_error.css.nom = "is-invalid" ; 
            if(this.formulaire_Control.controls.nom.errors?.required){
                this.form_error.texte.nom = "Entrez le nom du plat" ; 
            }else{                
                this.form_error.texte.nom = "Invalid character" ; 
            }
        }
        else{
            this.form_error.bool.nom = false ; 
            const input = this.formulaire_Control.get("nom").value ; 
            if(input.length<4){
                this.form_error.css.nom = "" ; 
            }else {
                this.form_error.css.nom = "is-valid" ; 
            }
        } 
    }

    on_change_type(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.type.errors?.required){
            this.form_error.bool.type = true ; 
            this.form_error.css.type = "is-invalid" ; 
            this.form_error.texte.type = "Selectionnez le type du plat" ; 
        }
        else{
            this.form_error.bool.type = false ; 
            this.form_error.css.type = "is-valid" ; 
        } 
    }

    on_change_prix(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.prix.errors?.pattern || this.formulaire_Control.controls.prix.errors?.required){
            this.form_error.bool.prix = true ; 
            this.form_error.css.prix = "is-invalid" ; 
            if(this.formulaire_Control.controls.prix.errors?.required){
                this.form_error.texte.prix = "Entrez le prix du plat" ; 
            }else{                
                this.form_error.texte.prix = "Invalid character" ; 
            }
        }
        else{
            this.form_error.bool.prix = false ; 
            this.form_error.css.prix = "is-valid" ; 
        } 
    }

    getTypes(){
        const success = (response:any) => {
            if(response.status == 200){
                this.types = response.data ;
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getTypes().subscribe(success,error)
    }

    getPlat(){
        const success = (response:any) => {
            if(response.status == 200){
                this.plat = response.data;
                this.init_form_control();
            } else if(response.status == 400) {
                this.error_server = response.message
                this.save = false ; 
            }
            else{
                console.log (response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getPlat(this.id_plat).subscribe(success,error)  
    }

    get loading(){
        return !this.types || !this.plat;
    }
}
