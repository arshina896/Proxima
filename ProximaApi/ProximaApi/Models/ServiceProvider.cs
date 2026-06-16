namespace ProximaApi.Models
{
    public class ServiceProvider
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsApproved { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
