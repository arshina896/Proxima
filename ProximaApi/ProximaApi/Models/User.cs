namespace ProximaApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsActive { get; set; } = true;
        public string Role { get; set; } = "User";
        public string? ProfileImage { get; set; }

        public string? PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Pincode { get; set; }

        public DateOnly? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? About { get; set; }
        public ICollection<Message> SentMessages { get; set; }
    = new List<Message>();

        public ICollection<Message> ReceivedMessages { get; set; }
            = new List<Message>();
    }
}
