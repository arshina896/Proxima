using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class BookingSatusDto
    {
        [Required]
        public string Status { get; set; }
    }
}
