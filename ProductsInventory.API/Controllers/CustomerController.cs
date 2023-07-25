using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data.DTOs;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public CustomerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<IActionResult> Get(int customerId)
        {
            var result = await _unitOfWork.CustomerService.Get(customerId);

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
            var result = await _unitOfWork.CustomerService.GetAll();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CustomerDTO dto)
        {
            dto.CreatedDate = DateTime.Now;
            _unitOfWork.CustomerService.Create(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(CustomerDTO dto)
        {
            dto.ModifiedDate = DateTime.Now;
            _unitOfWork.CustomerService.Update(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int customerId)
        {
            _unitOfWork.CustomerService.Delete(customerId);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }
    }
}
