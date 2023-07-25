using ProductsInventory.Data.DTOs;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface IProductService
    {
        void Create(ProductDTO dto);

        void Delete(int productId);
        
        Task<ProductDTO> Get(int productId);
        
        Task<IEnumerable<ProductDTO>> GetAll();
        
        void Update(ProductDTO dto);
    }
}