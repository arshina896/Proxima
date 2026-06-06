using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class BookingStatusDto
    {
        [Required]
        public string Status { get; set; }
    }
}
