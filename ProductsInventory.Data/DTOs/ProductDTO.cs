using Microsoft.EntityFrameworkCore;

namespace ProductsInventory.Data.DTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        [Precision(18,2)]
        public decimal Price { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set;}
    }
    
}
