using ProductsInventory.Data.ViewModels;

namespace ProductsInventory.BLL.Services.Contracts
{
    public interface IReportService
    {
        Task<IEnumerable<ReportViewModel>> GetPurchases(DateTime fromDate, DateTime toDate, string type);
        Task<IEnumerable<ReportViewModel>> GetSales(DateTime fromDate, DateTime toDate, string type);
    }
}