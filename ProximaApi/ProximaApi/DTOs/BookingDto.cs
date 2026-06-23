using System.ComponentModel.DataAnnotations;

namespace ProximaApi.DTOs
{
    public class BookingDto
    {
        [Required]
        public int ServiceId { get; set; }
        public DateOnly ServiceDate { get; set; }

        public string TimeSlot { get; set; }
    }
}
