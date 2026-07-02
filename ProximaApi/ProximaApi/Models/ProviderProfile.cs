namespace ProximaApi.Models
{
    public class ProviderProfile
    {
        public int Id { get; set; }

        public int ServiceProviderId { get; set; }

        public ServiceProvider ServiceProvider { get; set; }

        public string About { get; set; }

        public int Experience { get; set; }

        public string Address { get; set; }

        public string AvailableDays { get; set; }

        public TimeOnly AvailableFrom { get; set; }

        public TimeOnly AvailableTo { get; set; }
    }
}
