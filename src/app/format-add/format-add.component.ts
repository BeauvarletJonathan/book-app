import { Component, OnInit } from '@angular/core';
import { FormatService } from '../services/format.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Format } from '../format';

@Component({
  selector: 'app-format-add',
  templateUrl: './format-add.component.html',
  styleUrls: ['./format-add.component.css']
})
export class FormatAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private fs: FormatService) { }

  createForm: FormGroup;

  ngOnInit(): void {
    this.createForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50)]],
        height: ['', [Validators.required, Validators.maxLength(50)]],
        width: ['', [Validators.required, Validators.maxLength(50)]],
        landscape: [true],
      }
    )
  }

  get name() { 
    return this.createForm.get('name')
  }
  get height() { 
    return this.createForm.get('height')
  }
  get width() { 
    return this.createForm.get('width')
  }
  get landscape() { 
    return this.createForm.get('landscape')
  }

  create(){
    const format: Format = this.createForm.value;
    this.fs.create(format).subscribe(
      response => console.log(response)
    );
  }

}
