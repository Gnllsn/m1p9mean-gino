import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
    selector: 'app-confirm-commande',
    templateUrl: './confirm-commande.component.html',
    styleUrls: ['./confirm-commande.component.scss']
})
export class ConfirmCommandeComponent implements OnInit {

    save : boolean = false;
    form_error : any = {} ; 
    formulaire_Control : any ; 

    constructor(
        private api : ApiService,
        private tools : ToolsService,
        private formBuilder : FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data : any , 
        private dialogRef: MatDialogRef<ConfirmCommandeComponent>,
        ) { 
        this.formulaire_Control = formBuilder.group({
            quantite : ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
            lieu : ['',[Validators.required,Validators.pattern('^[a-zA-Z]+.*$')]],
        });
    }

    ngOnInit(): void {
        window.addEventListener("beforeunload", function (e) {
            e.returnValue = false; 
            return e;
        });
        this.initform_error();
    }

    initform_error(){
        this.form_error.css = {} ;
        this.form_error.bool = {} ;
        this.form_error.texte = {} ;
        this.init_quantite();
        this.init_lieu();
    }

    init_quantite(){
        this.form_error.css.quantite = "" ;
        this.form_error.bool.quantite = false;
        this.form_error.texte.quantite = "" ;
    }

    init_lieu(){
        this.form_error.css.lieu = "" ;
        this.form_error.bool.lieu = false;
        this.form_error.texte.lieu = "" ;
    }

    Control_valeur(){
        this.on_change_quantite();
        this.on_change_lieu();
        if (this.formulaire_Control.valid) {
            this.save_command(this.getData())
        }
    }

    getData(){
        const plat = {
            plat : {
                "nom" : this.data.nom,
                "prix" : this.data.prix,
                "restaut" : this.data.restaut,
                "type" : this.data.type,
            },
            quantite : this.formulaire_Control.get("quantite").value,
            lieu : this.formulaire_Control.get("lieu").value
        }
        return plat ;
    }


    save_command(data:any){
        const success = (response:any) => {
            if(response.status == 200){
                this.close()
            }
            else{
                console.log (response);
            }
        }
        const error = (response:any) => {
            console.log (response) ; 
        }
        this.save = true ; 
        this.api.save_command(data).subscribe(success,error)
    }

    // ______________ on change input ________________________________

    on_change_quantite(){
        if(this.formulaire_Control.controls.quantite.errors?.pattern || this.formulaire_Control.controls.quantite.errors?.required){
            this.form_error.bool.quantite = true ; 
            this.form_error.css.quantite = "is-invalid" ; 
            if(this.formulaire_Control.controls.quantite.errors?.required){
                this.form_error.texte.quantite = "Entrez le quantite du plat" ; 
            }else{                
                this.form_error.texte.quantite = "Invalid character" ; 
            }
        }
        else{
            this.form_error.bool.quantite = false ; 
            this.form_error.css.quantite = "is-valid" ; 
        } 
    }

    on_change_lieu(){
        if(this.formulaire_Control.controls.lieu.errors?.pattern || this.formulaire_Control.controls.lieu.errors?.required){
            this.form_error.bool.lieu = true ; 
            this.form_error.css.lieu = "is-invalid" ; 
            if(this.formulaire_Control.controls.lieu.errors?.required){
                this.form_error.texte.lieu = "Entrez le lieu du livraison" ; 
            }else{                
                this.form_error.texte.lieu = "Invalid character" ; 
            }
        }
        else{
            this.form_error.bool.lieu = false ; 
            this.form_error.css.lieu = "is-valid" ; 
        } 
    }


    close(){
        this.dialogRef.close();
    }

}
