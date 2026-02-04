using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class CategoryDto
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
