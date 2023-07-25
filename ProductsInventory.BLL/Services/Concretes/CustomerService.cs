using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomerService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CustomerDTO> Get(int customerId)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(x => x.CustomerId == customerId);

            return _mapper.Map<CustomerDTO>(customer);
        }

        public async Task<IEnumerable<CustomerDTO>> GetAll()
        {
            List<Customer> customers = await _context.Customers.ToListAsync();

            return _mapper.Map<List<CustomerDTO>>(customers);
        }

        public async void Create(CustomerDTO dto)
        {
            Customer customer = _mapper.Map<Customer>(dto);
            _context.Customers.Add(customer);
        }

        public async void Update(CustomerDTO dto)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(x => x.CustomerId == dto.CustomerId);

            if (customer != null)
            {
                _mapper.Map(dto, customer);
            }
        }

        public async void Delete(int customerId)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(x => x.CustomerId == customerId);

            if (customer != null)
            {
                _context.Customers.Remove(customer);
            }
        }
    }
}
