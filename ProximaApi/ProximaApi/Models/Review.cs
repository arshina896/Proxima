namespace ProximaApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ServiceProviderUserId { get; set; }
        public User ServiceProviderUser { get; set; }

        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
