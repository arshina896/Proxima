using System.ComponentModel.DataAnnotations;

namespace ProximaApi.Models
{
    public class ServiceCategories
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }
        public ICollection<Service> Services { get; set; }

    }
}
