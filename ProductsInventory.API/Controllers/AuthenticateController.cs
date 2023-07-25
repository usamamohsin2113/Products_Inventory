using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using ProductsInventory.Data.DTOs.AuthenticateDTOs;
using ProductsInventory.Models.ViewModel;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ProductsInventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<IdentityUser> userManager, IMapper mapper, IConfiguration configuration)
        {
            _userManager = userManager;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UserLoginDTO dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Email);

            if (user == null)
            {
                return NotFound(new ApiResponse
                {
                    Success = false,
                    Message = "User Not Found!",
                    Data = new { }
                });
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, dto.Password))
            {
                var authClaim = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var jwtToken = await GetToken(authClaim);

                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = { },
                    Data = new
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                        Expiration = jwtToken.ValidTo,
                        Roles = new List<string> { "SuperAdmin", "Admin" }

                    }
                });
            }

            return Ok(new ApiResponse
            {
                Success = false,
                Message = "Password not Matched!",
                Data = new { }
            });
        }

        [NonAction]
        public async Task<JwtSecurityToken> GetToken(List<Claim> Authclaims)
        {
            var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(6),
                claims: Authclaims,
                signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
