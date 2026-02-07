using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class BookingDto
    {
        [Required]
        public int ServiceId { get; set; }
    }
}
