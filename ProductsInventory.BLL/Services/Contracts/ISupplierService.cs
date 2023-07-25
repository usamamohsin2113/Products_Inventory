using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface ISupplierService
    {
        void Create(SupplierDTO dto);

        void Delete(int supplierId);
        
        Task<SupplierDTO> Get(int supplierId);
        
        Task<IEnumerable<SupplierDTO>> GetAll();
        
        void Update(SupplierDTO dto);
    }
}