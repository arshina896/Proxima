namespace ProximaApi.Models
{
    public class Message
    {
        public int Id { get; set; }


        public int SenderId { get; set; }
        public User Sender { get; set; }

  
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }

     
        public int BookingId { get; set; }
        public Booking Booking { get; set; }

  
        public string Text { get; set; }


        public bool IsRead { get; set; } = false;

  
        public DateTime SentAt { get; set; } = DateTime.Now;
    }
}

