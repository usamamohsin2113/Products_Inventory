using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsInventory.Data.Entities
{
    public class SaleItem
    {
        [Key]
        public int SaleItemId { get; set; }

        [ForeignKey("Sale")]
        public int SaleId { get; set; }
        public Sale Sale { get; set; }

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
