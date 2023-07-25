using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        private ICustomerService _customerService;
        private IProductService _productService;
        private IPurchaseService _purchaseService;
        private ISaleService _saleService;
        private ISupplierService _supplierService;
        private IReportService _reportService;

        public ICustomerService CustomerService
        {
            get
            {
                if (_customerService == null)
                {
                    _customerService = new CustomerService(_context, _mapper);
                }

                return _customerService;
            }
        }

        public IProductService ProductService
        {
            get
            {
                if (_productService == null)
                {
                    _productService = new ProductService(_context, _mapper);
                }

                return _productService;
            }
        }

        public IPurchaseService PurchaseService
        {
            get
            {
                if (_purchaseService == null)
                {
                    _purchaseService = new PurchaseService(_context, _mapper);
                }

                return _purchaseService;
            }
        }

        public ISaleService SaleService
        {
            get
            {
                if (_saleService == null)
                {
                    _saleService = new SaleService(_context, _mapper);
                }

                return _saleService;
            }
        }

        public ISupplierService SupplierService
        {
            get
            {
                if (_supplierService == null)
                {
                    _supplierService = new SupplierService(_context, _mapper);
                }

                return _supplierService;
            }
        }

        public IReportService ReportService
        {
            get
            {
                if (_reportService == null)
                {
                    _reportService = new ReportService(_context);
                }

                return _reportService;
            }
        }

        public UnitOfWork(ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;   
        }

        public async Task<int> CommitAsync() 
        {
            return await _context.SaveChangesAsync();
        }

        public void Rollback()
        {
            foreach (var entry in _context.ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }

            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~UnitOfWork()
        {
            Dispose(false);
        }
    }
}
