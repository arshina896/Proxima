using System.ComponentModel.DataAnnotations.Schema;

namespace ProximaApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey(nameof(ServiceProvider))]
        public int ServiceProviderId { get; set; }
        public ServiceProvider ServiceProvider { get; set; }

        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
