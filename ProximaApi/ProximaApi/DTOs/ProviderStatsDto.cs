namespace ProximaApi.DTOs
{
    public class ProviderStatsDto
    {
        public int TotalServices { get; set; }

        public int TotalBookings { get; set; }

        public int PendingBookings { get; set; }

        public int ApprovedBookings { get; set; }

        public int RejectedBookings { get; set; }

        public int CompletedBookings { get; set; }
    }
}
