using ProximaApi.Enums;

namespace ProximaApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public DateTime BookingDate { get; set; }
        public BookingStatus Status { get; set; }
        public DateOnly? ServiceDate { get; set; }

        public string? TimeSlot { get; set; }
        public ICollection<Message> Messages { get; set; }
    = new List<Message>();
    }
}
