import { Component, OnInit } from '@angular/core';
import { FormatService } from '../services/format.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Format } from '../format';

@Component({
  selector: 'app-format-detail',
  templateUrl: './format-detail.component.html',
  styleUrls: ['./format-detail.component.css']
})
export class FormatDetailComponent implements OnInit {

  constructor(private formatService: FormatService, private route: ActivatedRoute, private fb: FormBuilder) { }

  format: Format; 
  formEdit: FormGroup;

  ngOnInit(): void {
    //récupération du paramètre id et conversion en type number
    let id = +this.route.snapshot.paramMap.get('id');
    this.formatService.get(id).subscribe(
      data => {
        this.format = data;
      }
    )
  }
  
  //renvoie un formGroup approprié pour l'édition d'un format
  initForm(): FormGroup{
    return this.fb.group(
      {
        name: [this.format.name],
        height: [this.format.height],
        width: [this.format.width],
        landscape: [this.format.landscape]
      }
    )
  }

  edit(): void {
    const formatUpdate:Format = this.formEdit.value; 
    formatUpdate.id = this.format.id;
    this.formatService.update(formatUpdate).subscribe(data => {
      //on met a jour la donnée locale avec le genre modifié reçu depuis l'api
      this.format = data;
      //puis on desactive le mode edition
      this.toggleEdit();
    })
  }

  //editing sert à savoir si on est en mode édition ou pas
  editMode: boolean = false;
  //cette fonction active ou desactive le mode edition selon s'il est déjà activé ou désactivé
  toggleEdit(){
    //on inverse le mode d'edition
    this.editMode = !this.editMode; 
    if (this.editMode){
      //on range un formGroup fraichement initialisé dans formEdit
      this.formEdit = this.initForm();
    } else {
      //a la desactivation du mode edition on supprime l'instance de formGroup de notre formulaire
      this.formEdit = null;
    }
  }
}