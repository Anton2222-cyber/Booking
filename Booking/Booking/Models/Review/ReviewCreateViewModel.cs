namespace Booking.Models.Review
{
    public class ReviewCreateViewModel
    {
        public int HotelId { get; set; }
        public int UserId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
    }
}
