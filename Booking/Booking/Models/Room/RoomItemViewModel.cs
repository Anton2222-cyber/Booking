using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Models.Room
{
    public class RoomItemViewModel
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public string RoomType { get; set; }
        public double Price { get; set; }
        public string Amenities { get; set; }
        public List<string> Photos { get; set; }
    }
}
