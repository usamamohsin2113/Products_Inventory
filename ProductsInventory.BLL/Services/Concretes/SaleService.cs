using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class SaleService : ISaleService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SaleService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SaleDTO> Get(int saleId)
        {
            Sale sale = await _context.Sales
                                      .Include(x => x.SaleItems)
                                      .FirstOrDefaultAsync(x => x.SaleId == saleId);

            SaleDTO dto = _mapper.Map<SaleDTO>(sale);

            dto.SaleItems.ForEach(x =>
            {
                x.ProductName = _context.Products.FirstOrDefault(y => y.ProductId == x.ProductId)?.Name ?? "";
            });

            return dto;
        }

        public async Task<IEnumerable<SaleDTO>> GetAll()
        {
            List<Sale> sales = await _context.Sales.ToListAsync();

            return _mapper.Map<List<SaleDTO>>(sales);
        }

        public async void Create(SaleDTO dto)
        {
            Sale sale = _mapper.Map<Sale>(dto);
            sale.SaleItems = _mapper.Map<ICollection<SaleItem>>(dto.SaleItems);
            _context.Sales.Add(sale);
        }

        public async void Update(SaleDTO dto)
        {
            Sale sale = _context.Sales
                                      .Include(x => x.SaleItems)
                                      .FirstOrDefault(x => x.SaleId == dto.SaleId);

            if (sale != null)
            {
                _context.SaleItems.RemoveRange(sale.SaleItems);

                _mapper.Map(dto, sale);
            }
        }

        public async void Delete(int saleId)
        {
            Sale sale = _context.Sales
                                      .Include(x => x.SaleItems)
                                      .FirstOrDefault(x => x.SaleId
                                      == saleId);

            if (sale != null)
            {
                _context.SaleItems.RemoveRange(sale.SaleItems);
                _context.Sales.Remove(sale);
            }
        }
    }
}
