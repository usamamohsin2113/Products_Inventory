using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductsInventory.Data.Entities;

namespace ProductsInventory.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseItem> PurchaseItems { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedUser(builder);
        }

        private static void SeedUser(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            modelBuilder.Entity<IdentityUser>().HasData(
                new IdentityUser() { UserName = "Usama", NormalizedUserName = "USAMA", Email = "usama@gmail.com", NormalizedEmail = "USAMA@GMAIL.COM", PasswordHash = hasher.HashPassword(null, "Usama@123") }
                );
        }
    }
}
