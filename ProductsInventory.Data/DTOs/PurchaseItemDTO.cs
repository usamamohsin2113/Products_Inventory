using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.DTOs
{
    public class PurchaseItemDTO
    {
        [Key]
        public int PurchaseItemId { get; set; }

        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [Precision(18,2)]
        public decimal TotalPrice { get; set; }
    }
}
