using System.ComponentModel.DataAnnotations;

namespace ProximaApi.Models
{
    public class Service
    {
        public int Id { get; set; }
        [Required]
        public string ServiceName { get; set; }
        public decimal Price { get; set; }
        public int ServiceProviderId { get; set; }
        public ServiceProvider ServiceProvider { get; set; }
        public int ServiceCategoryId { get; set; }
        public ServiceCategories ServiceCategory { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public string? Description { get; set; }
            
    }
}



