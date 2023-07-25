using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data.DTOs;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public SupplierController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<IActionResult> Get(int supplierId)
        {
            var result = await _unitOfWork.SupplierService.Get(supplierId);

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
            var result = await _unitOfWork.SupplierService.GetAll();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(SupplierDTO dto)
        {
            dto.CreatedDate = DateTime.Now;
            _unitOfWork.SupplierService.Create(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(SupplierDTO dto)
        {
            dto.ModifiedDate = DateTime.Now;
            _unitOfWork.SupplierService.Update(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int supplierId)
        {
            _unitOfWork.SupplierService.Delete(supplierId);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }
    }
}
