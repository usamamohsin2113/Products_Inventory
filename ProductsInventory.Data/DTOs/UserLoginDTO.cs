using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.DTOs.AuthenticateDTOs
{
    public class UserLoginDTO
    {
        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
