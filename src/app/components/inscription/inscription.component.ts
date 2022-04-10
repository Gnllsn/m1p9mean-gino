import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

    loading : any = {
        data : true ,
        save : false
    }
    roles : any = [];
    form_error : any = {} ; 
    formulaire_Control : any ; 
    input_password : boolean = true  ;
    error_server : any ;

    constructor(
        private api:ApiService,
        private tools:ToolsService,
        private formBuilder: FormBuilder,
        private router: Router
        ) {
        this.formulaire_Control = formBuilder.group({
            nom : ['',[Validators.minLength(4),Validators.required,Validators.pattern('^[a-zA-Z]+.*$')]],
            email : ['',[Validators.required,Validators.email,Validators.pattern('.+\\.[a-z]{2,}$')]],
            password : ['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)],],
            role : ['',[Validators.required]],
            restaut : ['',[Validators.required]],
            local : ['',[Validators.required]]
        });
    }

    ngOnInit(): void {
        this.initform_error();
        this.getRoles();
    }

    initform_error(){
        this.form_error.css = {} ;
        this.form_error.bool = {} ;
        this.form_error.texte = {} ;
        this.init_nom();
        this.init_email();
        this.init_password();
        this.init_role();
        this.init_restaut();
        this.init_local();
    }

    init_nom(){
        this.form_error.css.nom = "" ;
        this.form_error.bool.nom = false;
        this.form_error.texte.nom = "" ;
    }

    init_email(){
        this.form_error.css.email = "" ; 
        this.form_error.bool.email = "" ; 
        this.form_error.texte.email = false ; 
    }

    init_password(){
        this.form_error.css.password = "" ; 
        this.form_error.bool.password = "" ; 
        this.form_error.texte.password = false ; 
    }

    init_role(){
        this.form_error.css.role = "" ; 
        this.form_error.bool.role = "" ; 
        this.form_error.texte.role = false ; 
    }

    init_restaut(){
        this.form_error.css.restaut = "" ; 
        this.form_error.bool.restaut = "" ; 
        this.form_error.texte.restaut = false ;
    }

    init_local(){
        this.form_error.css.local = "" ; 
        this.form_error.bool.local = "" ; 
        this.form_error.texte.local = false ;    
    }

    Control_valeur(){
        this.on_change_nom();
        this.on_change_email();
        this.on_change_password();
         if(this.formulaire_Control.controls.role.errors?.required){
            this.form_error.bool.role = true ; 
            this.form_error.css.role = "is-invalid" ; 
            this.form_error.texte.role = "Profil invalide" ; 
        }
        this.on_change_restaut();
        this.on_change_local();
        if(this.getRole()!='restaurant'){
            this.formulaire_Control.controls['restaut'].setValue('c');
            this.formulaire_Control.controls['local'].setValue('c');
        }
        if (this.formulaire_Control.valid) {
            this.register(this.getData())
        }
    }

    getData(){
        const user = {
            "nom" : this.formulaire_Control.get("nom").value,
            "email" : this.formulaire_Control.get("email").value,
            "password" : this.formulaire_Control.get("password").value,
            "role" : {
                "nom" : this.formulaire_Control.get("role").value
            },
            "restaut" : this.formulaire_Control.get("restaut").value,
            "local" : this.formulaire_Control.get("local").value
        }
        return user ;
    }

    register(data:any){
        const success = (response:any) => {
            if(response.status == 200){
                const data_store = response.data ;
                this.tools.store("user",data_store)    
                if(data_store.user.role.nom === 'client'){
                    this.router.navigate(['/user']);
                }else if(data_store.user.role.nom === 'restaurant'){
                    this.router.navigate(['/restaurant']);
                }else if(data_store.user.role.nom === 'livreur'){
                    this.router.navigate(['/livreur']);
                }else if(data_store.user.role.nom === 'admin'){
                    this.router.navigate(['/admin']);
                }
            } else if(response.status == 400) {
                this.error_server = response.message;
                this.loading.save = false ; 
            }
            else{
                console.log (response.message);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.loading.save = true ; 
        this.api.register(data).subscribe(success,error)
    }

    // ______________ on change input ________________________________

    on_change_nom(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.nom.errors?.pattern || this.formulaire_Control.controls.nom.errors?.required){
            this.form_error.bool.nom = true ; 
            this.form_error.css.nom = "is-invalid" ; 
            if(this.formulaire_Control.controls.nom.errors?.required){
                this.form_error.texte.nom = "Veillez entrez votre nom" ; 
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

    on_change_email(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.email.errors?.email ||
            this.formulaire_Control.controls.email.errors?.required || 
            this.formulaire_Control.controls.email.errors?.pattern)
        {
            this.form_error.css.email = "is-invalid" ;
            this.form_error.bool.email = true ; 
            this.form_error.texte.email = "Veuillez entrez un email valid (e.g. example@example.fr)" ; 
        } else {
            this.form_error.bool.email = false ;
            this.form_error.css.email = "is-valid" ; 
        }
    }

    on_change_password(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.password.errors?.pattern || this.formulaire_Control.controls.password.errors?.required){
            this.form_error.bool.password = true ; 
            this.form_error.css.password = "is-invalid" ; 
            if(this.formulaire_Control.controls.password.errors?.required){
                this.form_error.texte.password = "Veillez entrez votre mot de passe" ; 
            }else{                
                this.form_error.texte.password = "Le champ doit contenir au moins 1 miniscule , 1 majuscule , 1 chiffre et 1 character special" ; 
            }
        }
        else{
            this.form_error.bool.password = false ; 
            this.form_error.css.password = "is-valid" ; 
        } 
    }

    on_change_role(){
        this.error_server = null ; 
        if(this.formulaire_Control.controls.role.errors?.required){
            this.form_error.bool.role = true ; 
            this.form_error.css.role = "is-invalid" ; 
            this.form_error.texte.role = "Profil invalide" ; 
        }
        else{
            this.form_error.bool.role = false ; 
            this.form_error.css.role = "is-valid" ; 
        } 
        if(this.getRole()==='restaurant'){
            this.formulaire_Control.controls['restaut'].setValue('');
            this.formulaire_Control.controls['local'].setValue('');            
        }
    }

    on_change_restaut(){
        this.error_server = null ; 
        if(this.getRole()==='restaurant'){
            if(this.formulaire_Control.controls.restaut.errors?.required){
                this.form_error.bool.restaut = true ; 
                this.form_error.css.restaut = "is-invalid" ; 
                this.form_error.texte.restaut = "Nom du restaurant requis" ; 
            }
            else{
                this.form_error.bool.restaut = false ; 
                this.form_error.css.restaut = "is-valid" ; 
            } 
        }
    }

    on_change_local(){
        this.error_server = null ; 
        if(this.getRole()==='restaurant'){
            if(this.formulaire_Control.controls.local.errors?.required){
                this.form_error.bool.local = true ; 
                this.form_error.css.local = "is-invalid" ; 
                this.form_error.texte.local = "Localistation requis" ; 
            }
            else{
                this.form_error.bool.local = false ; 
                this.form_error.css.local = "is-valid" ; 
            } 
        }
    }

    // _______________________________________________________________

    getRoles(){
        const success = (response:any) => {
            if(response.status == 200){
                this.roles = response.data ;
                this.roles.pop()
                this.loading.data = false ; 
            } else {
                console.log(response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.api.getRoles().subscribe(success,error)
    }

    change_type(){
        this.input_password = !this.input_password;
    }

    getPassword(){
        return this.formulaire_Control.get("password").value ;
    }

    getRole(){
        return this.formulaire_Control.get("role").value ;

    }

}
