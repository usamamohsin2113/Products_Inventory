using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.DTOs
{
    public class SaleItemDTO
    {
        [Key]
        public int SaleItemId { get; set; }

        public int SaleId { get; set; }

        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [Precision(18,2)]
        public decimal TotalPrice { get; set; }
    }
}
