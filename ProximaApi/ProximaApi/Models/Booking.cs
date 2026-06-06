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
    }
}
