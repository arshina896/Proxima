namespace ProximaApi.Models
{
    public class ServiceProviders
    {
        
        public int Id { get; set; }
        public string ProviderName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Phone {  get; set; }
        public bool IsApproved { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
