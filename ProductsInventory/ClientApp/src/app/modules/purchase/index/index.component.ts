import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';
import { IPurchaseForm } from '../../../interfaces/product-form-data';
import { PurchaseService } from '../../../services/purchase.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //quantityVal: number = 0;
  products!: any[];
  supliers!: any[];
  formData: IPurchaseForm[] = [];
  purchasedItems: any[] = [];
  searchText: string = '';
  showDropdown: boolean = false;
  searchSuplier: string = '';
  showSupliers: boolean = false;
  selectedSuplier: any = null;
  selectedProduct: any = null;
  Api_req: any = []
  totalPrice: number = 0;
  itemPrice: number = 0;
  grandTotal: number = 0;
  quantity:number = 0;

  purchaseId: number | null = null;
  //@ViewChild('quantity') quantity!: ElementRef;


  constructor(private svc: ProductService, 
    private suplierServie: SupplierService, 
    private purchaseService: PurchaseService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const purchaseID = this.route.snapshot.params.id;
    console.log("routerId", purchaseID)
    if(purchaseID)
    {
      this.purchaseId = purchaseID;
      this.GetSingleProduct(purchaseID);
    }

      this.GetProductDetails();
      this.GetSuplierDetails();


  }

  GetProductDetails() {
    return this.svc.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.data;
      console.log("product data", data)
    });
  }

  GetSingleProduct(purchaseid: any)
  {
    this.purchaseService.getSinglePurchase(purchaseid).subscribe((result: any) => {
      if (result.success) {
        const purchase = result.data;
  
        this.selectedSuplier = {
          supplierId: purchase.supplierId,
          name: purchase.supplierName,
        };
        
        this.grandTotal = purchase.totalPrice;
  
        this.formData = purchase.purchaseItems.map((item: any) => ({
          product: item.productName,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));

            // Update purchasedItems array
            this.purchasedItems = purchase.purchaseItems.map((item: any) => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
            }));

        console.log("single purchase", purchase);
      }
    });
  }

  GetSuplierDetails() {
    return this.suplierServie.getSuppliers().subscribe((data: any) => {
      console.log(data);
      this.supliers = data.data;
      console.log("suplier data", data)
    });
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // delay to allow for click event to fire when selecting a dropdown item
  }

  hideSupliers() {
    setTimeout(() => {
      this.showSupliers = false;
    }, 200); // delay to allow for click event to fire when selecting a dropdown item
  }

  setProduct(event: any)
  {
    this.selectedProduct = event;
    this.itemPrice = event.price;
    this.totalPrice = 0
    this.quantity = 0
  }

  setSuplier(event: any)
  {
    this.selectedSuplier = event
    console.log("suplier data", event)
  }

  updatePrice()
  {
    this.totalPrice = this.quantity*this.itemPrice;
  }

  updateGrandTotal() {
    this.grandTotal = this.purchasedItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  AddToForm()
  {
    const values = {
      // suplier: this.selectedSuplier.name,
      product: this.selectedProduct.name,
      price: this.selectedProduct.price,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
    }
    const purchaseItem = {
      productId: this.selectedProduct.productId,
      price: this.selectedProduct.price,
      quantity: this.quantity,
      totalPrice: this.quantity*this.selectedProduct.price,
    }
    this.purchasedItems.push(purchaseItem);
    this.updateGrandTotal();
    this.formData.push(values);
    console.log("form data", this.formData);
  }

  sendPurchase()
  {
    if(this.purchaseId){
    this.Api_req = {
      purchaseId: this.purchaseId, 
      purchaseDate: new Date().toISOString(),
      supplierId: this.selectedSuplier.supplierId,
      supplierName: this.selectedSuplier.name,
      description: 'Purchased items',
      totalPrice: this.grandTotal,
      createdBy: 'manager',
      createdDate: new Date().toISOString(),
      modifiedBy: '',

      purchaseItems: this.purchasedItems,
    }
  }
  else{
    this.Api_req = { 
      purchaseDate: new Date().toISOString(),
      supplierId: this.selectedSuplier.supplierId,
      supplierName: this.selectedSuplier.name,
      description: 'Purchased items',
      totalPrice: this.grandTotal,
      createdBy: 'manager',
      createdDate: new Date().toISOString(),
      modifiedBy: '',

      purchaseItems: this.purchasedItems,
    }
  }
    console.log("api data", this.Api_req);
    if (this.purchaseId) {
      // Update existing purchase
      this.updatePurchase(this.Api_req);
    } else {
      // Create new purchase
      this.AddPurchases(this.Api_req);
    }
    //this.AddPurchases(this.Api_req);
  }

  AddPurchases(data: any)
  {
    this.purchaseService.createPurchases(data).subscribe((result:any) =>{
      if(result.success)
      {
        console.log("api result", result)
        alert("Purchase Added Successfully!")
        this.formData = [];
        this.Api_req = [];
        this.router.navigate(['purchase'])
      }
      else
      {
        alert("Failed to Purchase ")
      }
    })
  }

  updatePurchase(data: any)
  {
    this.purchaseService.updatePurchases(data).subscribe((result:any) =>{
      if(result.success)
      {
        console.log("api result", result)
        alert("Purchase updated Successfully!")
        this.formData = [];
        this.Api_req = [];
        this.router.navigate(['purchase'])
      }
      else
      {
        alert("Failed to Purchase ")
      }
    })
  }

  delete(dataItem: any) {
    const index = this.formData.findIndex(item => item === dataItem);

    if (index !== -1) {
        this.formData.splice(index, 1);
        this.purchasedItems.splice(index, 1);
        this.updateGrandTotal();
        this.formData = [...this.formData]; // Trigger change detection
    }
}

  cancelPurchase()
  {
    this.formData = [];
    this.Api_req = [];
    this.selectedProduct = [];
    this.selectedSuplier = [];
    this.totalPrice = 0;
    this.grandTotal = 0;
    this.quantity = 0;
    this.router.navigate(['purchase'])
  }
}
