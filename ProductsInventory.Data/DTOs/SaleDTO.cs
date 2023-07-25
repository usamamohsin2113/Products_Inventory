using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.DTOs
{
    public class SaleDTO
    {
        [Key]
        public int SaleId { get; set; }

        public DateTime SaleDate { get; set; }

        public int? CustomerId { get; set; }

        public required string CustomerName { get; set; }

        public string? Description { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        public required string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }


        public List<SaleItemDTO> SaleItems { get; set; }
    }
}
