using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsInventory.Data.Entities
{
    public class Sale
    {
        [Key]
        public int SaleId { get; set; }

        public DateTime SaleDate { get; set; }

        [ForeignKey("Customer")]
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Required]
        [MaxLength(100)]
        public required string CustomerName { get; set; }

        public string? Description { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        [Required]
        [MaxLength(50)]
        public required string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        [MaxLength(50)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }


        public ICollection<SaleItem> SaleItems { get; set; }
    }
}
