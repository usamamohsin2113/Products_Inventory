using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data;
using ProductsInventory.Data.ViewModels;

namespace ProductsInventory.BLL.Services.Concretes
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReportViewModel>> GetPurchases(DateTime fromDate, DateTime toDate, string type)
        {
            IEnumerable<ReportViewModel> result = null;

            switch (type)
            {
                case "daily":
                    result = _context.Purchases
                                     .Where(x => x.PurchaseDate.Date >= fromDate.Date && x.PurchaseDate.Date <= toDate.Date)
                                     .GroupBy(x => x.PurchaseDate.Date)
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = x.Key,
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;

                case "monthly":
                    result = _context.Purchases
                                     .Where(x => x.PurchaseDate.Date >= fromDate.Date && x.PurchaseDate.Date <= toDate.Date)
                                     .GroupBy(x => new { x.PurchaseDate.Month, x.PurchaseDate.Year })
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = new DateTime(x.Key.Year, x.Key.Month, 1),
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;

                case "yearly":
                    result = _context.Purchases
                                     .Where(x => x.PurchaseDate.Date >= fromDate.Date && x.PurchaseDate.Date <= toDate.Date)
                                     .GroupBy(x => x.PurchaseDate.Year)
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = new DateTime(x.Key, 1, 1),
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;
                default:
                    break;
            }

            return result;
        }

        public async Task<IEnumerable<ReportViewModel>> GetSales(DateTime fromDate, DateTime toDate, string type)
        {
            IEnumerable<ReportViewModel> result = null;

            switch (type)
            {
                case "daily":
                    result = _context.Sales
                                     .Where(x => x.SaleDate.Date >= fromDate.Date && x.SaleDate.Date <= toDate.Date)
                                     .GroupBy(x => x.SaleDate.Date)
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = x.Key,
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;

                case "monthly":
                    result = _context.Sales
                                     .Where(x => x.SaleDate.Date >= fromDate.Date && x.SaleDate.Date <= toDate.Date)
                                     .GroupBy(x => new { x.SaleDate.Month, x.SaleDate.Year })
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = new DateTime(x.Key.Year, x.Key.Month, 1),
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;

                case "yearly":
                    result = _context.Sales
                                     .Where(x => x.SaleDate.Date >= fromDate.Date && x.SaleDate.Date <= toDate.Date)
                                     .GroupBy(x => x.SaleDate.Year)
                                     .Select(x => new ReportViewModel
                                     {
                                         OrderDate = new DateTime(x.Key, 1, 1),
                                         TotalAmount = x.Sum(y => y.TotalPrice)
                                     });
                    break;
                default:
                    break;
            }

            return result;
        }
    }
}
