using ProductsInventory.Data.DTOs;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface IPurchaseService
    {
        void Create(PurchaseDTO dto);

        void Delete(int purchaseId);
        
        Task<PurchaseDTO> Get(int purchaseId);
        
        Task<IEnumerable<PurchaseDTO>> GetAll();
        
        void Update(PurchaseDTO dto);
    }
}