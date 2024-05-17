using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Models.Review
{
    public class ReviewItemViewModel
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int UserId { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
    }
}
