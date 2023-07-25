﻿using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ProductsInventory.Models.ViewModel;
using ProductsInventory.BLL.Services.Contracts;
using ProductsInventory.Data.DTOs;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("Get")]
        public async Task<IActionResult> Get(int productId)
        {
            var result = await _unitOfWork.ProductService.Get(productId);

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
            var result = await _unitOfWork.ProductService.GetAll();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success",
                Data = result
            });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(ProductDTO dto)
        {
            dto.CreatedDate = DateTime.Now;
            _unitOfWork.ProductService.Create(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update(ProductDTO dto)
        {
            dto.ModifiedDate = DateTime.Now;
            _unitOfWork.ProductService.Update(dto);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int productId)
        {
            _unitOfWork.ProductService.Delete(productId);

            await _unitOfWork.CommitAsync();

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Success"
            });
        }
    }
}
