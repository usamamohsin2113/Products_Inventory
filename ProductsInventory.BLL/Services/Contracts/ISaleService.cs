using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface ISaleService
    {
        void Create(SaleDTO dto);
        
        void Delete(int saleId);
        
        Task<SaleDTO> Get(int saleId);
        
        Task<IEnumerable<SaleDTO>> GetAll();
        
        void Update(SaleDTO dto);
    }
}