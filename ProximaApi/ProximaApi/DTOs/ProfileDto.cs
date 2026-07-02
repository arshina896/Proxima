namespace ProximaApi.DTOs
{
    public class ProfileDto
    {
        public string? FullName { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Pincode { get; set; }

        public string? About { get; set; }

        public IFormFile? ProfileImage { get; set; }
    }
}
