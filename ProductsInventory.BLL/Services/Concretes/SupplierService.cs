using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class SupplierService : ISupplierService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SupplierService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SupplierDTO> Get(int supplierId)
        {
            Supplier supplier = await _context.Suppliers.FirstOrDefaultAsync(x => x.SupplierId == supplierId);

            return _mapper.Map<SupplierDTO>(supplier);
        }

        public async Task<IEnumerable<SupplierDTO>> GetAll()
        {
            List<Supplier> suppliers = await _context.Suppliers.ToListAsync();

            return _mapper.Map<List<SupplierDTO>>(suppliers);
        }

        public async void Create(SupplierDTO dto)
        {
            Supplier supplier = _mapper.Map<Supplier>(dto);
            _context.Suppliers.Add(supplier);
        }

        public async void Update(SupplierDTO dto)
        {
            Supplier supplier = await _context.Suppliers.FirstOrDefaultAsync(x => x.SupplierId == dto.SupplierId);

            if (supplier != null)
            {
                _mapper.Map(dto, supplier);
            }
        }

        public async void Delete(int supplierId)
        {
            Supplier supplier = await _context.Suppliers.FirstOrDefaultAsync(x => x.SupplierId == supplierId);

            if (supplier != null)
            {
                _context.Suppliers.Remove(supplier);
            }
        }
    }
}
