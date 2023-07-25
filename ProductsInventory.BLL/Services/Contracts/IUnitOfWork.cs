namespace ProductsInventory.BLL.Services.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        public ICustomerService CustomerService { get; }

        public IProductService ProductService { get; }

        public IPurchaseService PurchaseService { get; }

        public ISaleService SaleService { get; }

        public ISupplierService SupplierService { get; }

        public IReportService ReportService { get; }

        Task<int> CommitAsync();

        void Rollback();
    }
}
