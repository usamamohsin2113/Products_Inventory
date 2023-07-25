using System.ComponentModel.DataAnnotations;

namespace ProductsInventory.Data.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        public string? Description { get; set; }

        [Required]
        [MaxLength(50)]
        public required string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        [MaxLength(50)]
        public string? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }
}
