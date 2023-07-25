using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class PurchaseService : IPurchaseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PurchaseService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PurchaseDTO> Get(int purchaseId)
        {
            Purchase purchase = await _context.Purchases
                                              .Include(x => x.PurchaseItems)
                                              .FirstOrDefaultAsync(x => x.PurchaseId == purchaseId);

            PurchaseDTO dto = _mapper.Map<PurchaseDTO>(purchase);

            dto.PurchaseItems.ForEach(x =>
            {
                x.ProductName = _context.Products.FirstOrDefault(y => y.ProductId == x.ProductId)?.Name ?? "";
            });

            return dto;
        }

        public async Task<IEnumerable<PurchaseDTO>> GetAll()
        {
            List<Purchase> purchases = await _context.Purchases.ToListAsync();

            return _mapper.Map<List<PurchaseDTO>>(purchases);
        }

        public async void Create(PurchaseDTO dto)
        {
            Purchase purchase = _mapper.Map<Purchase>(dto);
            purchase.PurchaseItems = _mapper.Map<ICollection<PurchaseItem>>(dto.PurchaseItems);

            _context.Purchases.Add(purchase);
        }

        public async void Update(PurchaseDTO dto)
        {
            Purchase purchase =  _context.Purchases
                                              .Include(x => x.PurchaseItems)
                                              .FirstOrDefault(x => x.PurchaseId == dto.PurchaseId);

            if (purchase != null)
            {
                _context.PurchaseItems.RemoveRange(purchase.PurchaseItems);

                _mapper.Map(dto, purchase);
            }
        }

        public async void Delete(int purchaseId)
        {
            Purchase purchase = _context.Purchases
                                              .Include(x => x.PurchaseItems)
                                              .FirstOrDefault(x => x.PurchaseId == purchaseId);

            if (purchase != null)
            {
                _context.PurchaseItems.RemoveRange(purchase.PurchaseItems);
                _context.Purchases.Remove(purchase);
            }
        }
    }
}
