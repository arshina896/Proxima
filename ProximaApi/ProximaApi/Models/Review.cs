namespace ProximaApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ServiceProviderId { get; set; }
        public ServiceProviders ServiceProviders { get; set; }

        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
