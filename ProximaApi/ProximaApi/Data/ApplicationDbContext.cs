using Microsoft.EntityFrameworkCore;
using ProximaApi.Models;

namespace ProximaApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) 
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Service>()
                .Property(s => s.Price)
                .HasPrecision(10, 2);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ServiceProviders> ServiceProviders { get; set; }
        public DbSet<ServiceCategories> ServicesCategories { get; set; }
        public DbSet<Service> Services {  get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Review> Reviews { get; set; }

    }
}
