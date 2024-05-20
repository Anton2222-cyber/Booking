namespace Booking.Models.Review
{
    public class ReviewEditViewModel
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int UserId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
    }
}
