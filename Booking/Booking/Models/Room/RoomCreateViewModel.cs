using Microsoft.AspNetCore.Mvc;

namespace Booking.Models.Room
{
    public class RoomCreateViewModel
    {
        public int HotelId { get; set; }
        public string RoomType { get; set; }
        public double Price { get; set; }
        public string Amenities { get; set; }

        [BindProperty(Name = "images[]")]
        public List<IFormFile> Photos { get; set; }
    }
}