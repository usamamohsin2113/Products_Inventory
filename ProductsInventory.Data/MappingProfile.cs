using AutoMapper;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();

            CreateMap<Customer, CustomerDTO>();
            CreateMap<CustomerDTO, Customer>();

            CreateMap<Supplier, SupplierDTO>();
            CreateMap<SupplierDTO, Supplier>();

            CreateMap<PurchaseItem, PurchaseItemDTO>();
            CreateMap<PurchaseItemDTO, PurchaseItem>();

            CreateMap<SaleItem, SaleItemDTO>();
            CreateMap<SaleItemDTO, SaleItem>();

            CreateMap<Purchase, PurchaseDTO>();
            CreateMap<PurchaseDTO, Purchase>();

            CreateMap<Sale, SaleDTO>();
            CreateMap<SaleDTO, Sale>();
        }
    }
}

