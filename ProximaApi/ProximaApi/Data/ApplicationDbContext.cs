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

            
            modelBuilder.Entity<Review>()
.HasOne(r => r.User)
.WithMany()
.HasForeignKey(r => r.UserId)
.OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Review>()
            .HasOne(r => r.ServiceProvider)
            .WithMany(p => p.Reviews)
            .HasForeignKey(r => r.ServiceProviderId)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Service>()
                .HasOne(s => s.ServiceProvider)
                .WithMany(p => p.Services)
                .HasForeignKey(s => s.ServiceProviderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Service>()
                .HasOne(s => s.ServiceCategory)
                .WithMany(c => c.Services)
                .HasForeignKey(s => s.ServiceCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Booking Status Enum <-> String conversion
            modelBuilder.Entity<Booking>()
                .Property(b => b.Status)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Models.ServiceProvider> ServiceProviders { get; set; }
        public DbSet<ServiceCategories> ServicesCategories { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Notification> Notifications { get; set; }

    }
}
