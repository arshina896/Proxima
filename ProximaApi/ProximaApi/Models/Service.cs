namespace ProximaApi.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public decimal Price { get; set; }
        public int ServiceProviderId { get; set; }
        public ServiceProviders ServiceProviders { get; set; }
         public int ServiceCategoryId { get; set; }
        public ServiceCategories ServiceCategories { get; set; }
    }
}
