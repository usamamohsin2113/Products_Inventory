export interface ProductFormData {
    name: string;
    description: string;
    price: number;
}


export interface IPurchaseForm {
    //suplier: string;
    totalPrice: number;
    product: string;
    price: number;
    quantity: number;
}

export interface ISaleForm {
  //suplier: string;
  totalPrice: number;
  product: string;
  price: number;
  quantity: number;
}
