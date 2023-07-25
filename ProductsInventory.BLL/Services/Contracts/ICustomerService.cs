using ProductsInventory.Data.DTOs;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface ICustomerService
    {
        void Create(CustomerDTO dto);

        void Delete(int customerId);
        
        Task<CustomerDTO> Get(int customerId);
        
        Task<IEnumerable<CustomerDTO>> GetAll();
        
        void Update(CustomerDTO dto);
    }
}