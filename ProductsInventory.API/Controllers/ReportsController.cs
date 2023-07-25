using Microsoft.AspNetCore.Mvc;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ReportsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("GetPurchasesReport")]
        public async Task<IActionResult> GetPurchasesReport(DateTime fromDate, DateTime toDate, string type)
        {
            var result = await _unitOfWork.ReportService.GetPurchases(fromDate, toDate, type);

            return Ok( new ApiResponse
            {
                Success = true,
                Message="Success",
                Data = result
            });
        }

        [HttpGet]
        [Route("GetSalesReport")]
        public async Task<IActionResult> GetSalesReport(DateTime fromDate, DateTime toDate, string type)
        {
            var result = await _unitOfWork.ReportService.GetSales(fromDate, toDate, type);

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }
    }
}
