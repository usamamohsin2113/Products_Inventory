using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsInventory.Data.Entities
{
    public class PurchaseItem
    {
        [Key]
        public int PurchaseItemId { get; set; }

        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [Precision(18,2)]
        public decimal TotalPrice { get; set; }
    }
}
