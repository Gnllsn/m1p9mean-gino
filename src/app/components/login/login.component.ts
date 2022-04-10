import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading : boolean = false ;
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
            email : ['',[Validators.required,Validators.email,Validators.pattern('.+\\.[a-z]{2,}$')]],
            password : ['',[Validators.required],]
        });
    }

    ngOnInit(): void {
        this.initform_error();
    }

    initform_error(){
        this.form_error.css = {} ;
        this.form_error.bool = {} ;
        this.form_error.texte = {} ;
        this.init_email();
        this.init_password();
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

    Control_valeur(){
        this.on_change_email();
        this.on_change_password();
        if (this.formulaire_Control.valid) {
            this.login(this.getData())
        }
    }

    getData(){
        const user = {
            "email" : this.formulaire_Control.get("email").value,
            "password" : this.formulaire_Control.get("password").value
        }
        return user ;
    }

    login(data:any){
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
                this.loading = false ; 
            }
            else{
                console.log (response.message);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.loading = true ; 
        this.api.login(data).subscribe(success,error)
    }

    // ______________ on change input ________________________________

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
        if(this.formulaire_Control.controls.password.errors?.required){
            this.form_error.bool.password = true ; 
            this.form_error.css.password = "is-invalid" ; 
            this.form_error.texte.password = "Veillez entrez votre mot de passe" ; 
        }
        else{
            this.form_error.bool.password = false ; 
            this.form_error.css.password = "is-valid" ; 
        } 
    }


    // ____________________________________________________________________________

    change_type(){
        this.input_password = !this.input_password;
    }

    getPassword(){
        return this.formulaire_Control.get("password").value ;
    }


}
