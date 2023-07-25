using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsInventory.Data.Entities
{
    public class Purchase
    {
        [Key]
        public int PurchaseId { get; set; }

        public DateTime PurchaseDate { get; set; }

        [ForeignKey("Supplier")]
        public int? SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        [Required]
        [MaxLength(100)]
        public required string SupplierName { get; set; }

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


        public ICollection<PurchaseItem> PurchaseItems { get; set; }
    }
}
