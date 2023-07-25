using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.DTOs
{
    public class PurchaseDTO
    {
        [Key]
        public int PurchaseId { get; set; }

        public DateTime PurchaseDate { get; set; }

        public int SupplierId { get; set; }

        public required string SupplierName { get; set; }

        public string? Description { get; set; }

        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        public required string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }


        public List<PurchaseItemDTO> PurchaseItems { get; set; }
    }
}
