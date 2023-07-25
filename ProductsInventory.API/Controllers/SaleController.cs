using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data.DTOs;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public SaleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<IActionResult> Get(int saleId)
        {
            var result = await _unitOfWork.SaleService.Get(saleId);

            return Ok( new ApiResponse
            {
                Success = true,
                Message="Success",
                Data = result
            });
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _unitOfWork.SaleService.GetAll();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(SaleDTO dto)
        {
            dto.CreatedDate = DateTime.Now;
            _unitOfWork.SaleService.Create(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(SaleDTO dto)
        {
            dto.ModifiedDate = DateTime.Now;
            _unitOfWork.SaleService.Update(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int saleId)
        {
            _unitOfWork.SaleService.Delete(saleId);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }
    }
}
