namespace ProximaApi.Models
{
    public class ServiceProviders
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsApproved { get; set; }

    }
}
