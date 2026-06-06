using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class ServiceDto
    {
        [Required]
        public string ServiceName { get; set; }
        [Range(typeof(decimal), "1", "999999")]
        public decimal Price { get; set; }
        
        
        public int ServiceCategoryId { get; set; }
    }
}
