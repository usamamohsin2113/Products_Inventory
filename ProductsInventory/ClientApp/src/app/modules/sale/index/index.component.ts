import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { ISaleForm } from '../../../interfaces/product-form-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent {
  products!: any[];
  customers!: any[];
  formData: ISaleForm[] = [];
  saleItems: any[] = [];
  searchText: string = '';
  showDropdown: boolean = false;
  searchCustomer: string = '';
  showCustomers: boolean = false;
  selectedCustomer: any = null;
  selectedProduct: any = null;
  Api_req: any = [];
  totalPrice: number = 0;
  itemPrice: number = 0;
  grandTotal: number = 0;
  quantity: number = 0;

  saleId: number | null = null;

  constructor(
    private svc: ProductService,
    private suplierServie: SupplierService,
    private saleSersvice: SaleService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const saleID = this.route.snapshot.params.id;
    console.log("routerId", saleID)
    if(saleID)
    {
      this.saleId = saleID;
      this.GetSingleSale(saleID);
    }
    this.GetProductDetails();
    this.GetCustomers();
  }

  GetSingleSale(saleid: any)
  {
    this.saleSersvice.getSingleSale(saleid).subscribe((result: any) => {
      if (result.success) {
        const sale = result.data;
  
        this.selectedCustomer = {
          customerId: sale.customerId,
          name: sale.customerName,
        };
        
        this.grandTotal = sale.totalPrice;
  
        this.formData = sale.saleItems.map((item: any) => ({
          product: item.productName,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));

            // Update saleItems array
            this.saleItems = sale.saleItems.map((item: any) => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
            }));

        console.log("single sale", sale);
      }
    });
  }
  GetProductDetails() {
    return this.svc.getProducts().subscribe((data: any) => {
      this.products = data.data;
    });
  }

  GetCustomers() {
    return this.customerService.getCustomers().subscribe((data: any) => {
      this.customers = data.data;
    });
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // delay to allow for click event to fire when selecting a dropdown item
  }

  hideCustomers() {
    setTimeout(() => {
      this.showCustomers = false;
    }, 200); // delay to allow for click event to fire when selecting a dropdown item
  }

  setProduct(event: any) {
    this.selectedProduct = event;
    this.itemPrice = event.price;
    this.totalPrice = 0
    this.quantity = 0
  }

  setCustomer(event: any) {
    this.selectedCustomer = event
  }

  updatePrice() {
    this.totalPrice = this.quantity * this.itemPrice;
  }

  updateGrandTotal() {
    this.grandTotal = this.saleItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  AddToForm() {
    const values = {
      // suplier: this.selectedSuplier.name,
      product: this.selectedProduct.name,
      price: this.selectedProduct.price,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
    }
    const saleItem = {
      productId: this.selectedProduct.productId,
      price: this.selectedProduct.price,
      quantity: this.quantity,
      totalPrice: this.quantity * this.selectedProduct.price,
    }
    this.saleItems.push(saleItem);
    this.updateGrandTotal();
    this.formData.push(values);
  }

  sendSale() {
    if(this.saleId){
      this.Api_req = {
        saleId: this.saleId,
        saleDate: new Date().toISOString(),
        customerId: this.selectedCustomer.customerId,
        customerName: this.selectedCustomer.name,
        description: 'Sold items',
        totalPrice: this.grandTotal,
        createdBy: 'manager',
        createdDate: new Date().toISOString(),
        modifiedBy: '',
  
        saleItems: this.saleItems,
      }
    }
    else {
    this.Api_req = {
      saleDate: new Date().toISOString(),
      customerId: this.selectedCustomer.customerId,
      customerName: this.selectedCustomer.name,
      description: 'Sold items',
      totalPrice: this.grandTotal,
      createdBy: 'manager',
      createdDate: new Date().toISOString(),
      modifiedBy: '',

      saleItems: this.saleItems,
    }
  }
    console.log("api data", this.Api_req);
    if (this.saleId) {
      // Update existing sale
      this.updateSale(this.Api_req);
    } else {
      // Create new sale
      this.AddSales(this.Api_req);
    }
    //this.AddSales(this.Api_req);
  }

  AddSales(data: any) {
    this.saleSersvice.createSale(data).subscribe((result: any) => {
      if (result.success) {
        console.log("api result", result)
        alert("Sale Added Successfully!")
        this.formData = [];
        this.Api_req = [];
        this.router.navigate(['sale'])
      }
      else {
        alert("Failed to Sale")
      }
    })
  }

  updateSale(data: any)
  {
    this.saleSersvice.updateSale(data).subscribe((result:any) =>{
      if(result.success)
      {
        console.log("api result", result)
        alert("Sale updated Successfully!")
        this.formData = [];
        this.Api_req = [];
        this.router.navigate(['sale'])
      }
      else
      {
        alert("Failed to update Sale ")
      }
    })
  }

  delete(dataItem: any) {
    const index = this.formData.findIndex(item => item === dataItem);

    if (index !== -1) {
      this.formData.splice(index, 1);
      this.saleItems.splice(index,1)
      this.updateGrandTotal();
      this.formData = [...this.formData]; // Trigger change detection
    }
  }


  cancelSale() {
    this.formData = [];
    this.Api_req = [];
    this.selectedProduct = [];
    this.selectedCustomer = [];
    this.totalPrice = 0;
    this.grandTotal = 0;
    this.quantity = 0;
    this.router.navigate(['sale'])
  }
}
