using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data.DTOs;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public PurchaseController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<IActionResult> Get(int purchaseId)
        {
            var result = await _unitOfWork.PurchaseService.Get(purchaseId);

            return Ok( new ApiResponse
            {
                Success = true,
                Message="Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _unitOfWork.PurchaseService.GetAll();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(PurchaseDTO dto)
        {
            dto.CreatedDate = DateTime.Now;
            _unitOfWork.PurchaseService.Create(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(PurchaseDTO dto)
        {
            dto.ModifiedDate = DateTime.Now;
            _unitOfWork.PurchaseService.Update(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int purchaseId)
        {
            _unitOfWork.PurchaseService.Delete(purchaseId);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }
    }
}
