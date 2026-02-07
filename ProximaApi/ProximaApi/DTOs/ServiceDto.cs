using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class ServiceDto
    {
        [Required]
        public string ServiceName { get; set; }
        public decimal Price { get; set; }
        
        
        public int ServiceCategoryId { get; set; }
    }
}
