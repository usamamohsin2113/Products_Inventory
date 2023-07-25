import { Component , Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { FormServiceService } from '../../../services/form-service.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends DialogContentBase{

  @Input() public form!: FormGroup;

  constructor(dialog: DialogRef, private formService: FormServiceService) {
    super(dialog);
    this.form = this.formService.form;
    console.log(this.formService.form,"input data");
  }

  onFormSubmit() {
    console.log("form values", this.form.value);
    this.dialog.close(this.form.value);
  }
}


