namespace ProximaApi.DTOs
{
    public class MessageDto
    {
        public int BookingId { get; set; }

        public int ReceiverId { get; set; }

        public string Text { get; set; } = string.Empty;
    }
}
