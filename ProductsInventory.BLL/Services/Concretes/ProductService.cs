using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.DTOs;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductDTO> Get(int productId)
        {
            Product product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == productId);

            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<IEnumerable<ProductDTO>> GetAll()
        {
            List<Product> products = await _context.Products.ToListAsync();

            return _mapper.Map<List<ProductDTO>>(products);
        }

        public async void Create(ProductDTO dto)
        {
            Product product = _mapper.Map<Product>(dto);
            _context.Products.Add(product);
        }

        public async void Update(ProductDTO dto)
        {
            Product product =  _context.Products.FirstOrDefault(x => x.ProductId == dto.ProductId);

            if (product != null)
            {
                _mapper.Map(dto, product);
            }
        }

        public async void Delete(int productId)
        {
            Product product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == productId);

            if (product != null)
            {
                _context.Products.Remove(product);
            }
        }
    }
}
