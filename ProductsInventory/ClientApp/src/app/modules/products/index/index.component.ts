import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SVGIcon, filePdfIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { process } from "@progress/kendo-data-query";
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FormServiceService } from '../../../services/form-service.service';
import { DatePipe } from '@angular/common';
import { ProductFormData } from '../../../interfaces/product-form-data';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit {
  products!: any[];
  obs!: Subscription;
  public form!: FormGroup;
  public dialog!: DialogRef | null;

  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;

  constructor(private svc: ProductService, private dialogService: DialogService, private formService: FormServiceService, private datepipe: DatePipe,) {
  }

  ngOnInit() {
    this.GetProductDetails()

    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  // ngAfterViewInit() {
  //   // Once view is initialized, `dialogContainer` can be used
  // }
  

  GetProductDetails() {
    return this.svc.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.data;
      console.log("product data", data)
    });
  }

  create() {
    {
      this.form.reset(); // Reset the form to clear any previous values
    
      // set form data in service
      this.formService.form = this.form;
    
      this.dialog = this.dialogService.open({
        title: 'Create New Product',
        content: ProductFormComponent,
        appendTo: this.dialogContainer,
        width: 500,
        height: 500,
        minWidth: 250
      });
      // handle dialog result
      this.dialog.result.subscribe(result => {
        if (!(result instanceof DialogCloseResult)) {
          console.log('Dialog result:', result);
          const formData = result as any as ProductFormData;
          const Api_data = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            createdBy: 'test',
            createdDate: new Date().toISOString(),
          };
          this.formService.createProduct(Api_data).subscribe((result: any) =>{
            if(result.success)
            {
              alert("data added successfuly");
              this.GetProductDetails();
            }
          })
        }
        this.dialog = null;
      });
    }
  }
  

  edit(dataItem: any) {
    this.form.setValue({
      name: dataItem.name,
      description: dataItem.description,
      price: dataItem.price
    });

    // set form data in service
    this.formService.form = this.form;

    this.dialog = this.dialogService.open({
      title: 'Edit Product',
      content: ProductFormComponent,
      appendTo: this.dialogContainer,
      width: 500,
      height: 500,
      minWidth: 250
    });

    // handle dialog result
    this.dialog.result.subscribe(result => {
      if (!(result instanceof DialogCloseResult)) {
        console.log('Dialog result:', result);
        console.log("sent data", dataItem);
        const formData = result as any as ProductFormData;
          const Api_data = {
            productId: dataItem.productId,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            createdBy: dataItem.createdBy,
            createdDate: dataItem.createdDate,
            modifiedBy: 'test',
            modifiedDate: new Date().toISOString(),
          };
          this.formService.updateProduct(Api_data).subscribe((result: any) =>{
            if(result.success)
            {
              alert("data updated successfuly");
              this.GetProductDetails();
            }
          })
      }
      this.dialog = null;
    });
  }

  delete(dataItem: any) {
    console.log(dataItem);
    this.svc.deleteProduct(parseInt(dataItem.productId)).subscribe((result: any) => {
      if (result.success) {
        this.GetProductDetails();
        alert("Product deleted");
      }
    });
  }

  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
