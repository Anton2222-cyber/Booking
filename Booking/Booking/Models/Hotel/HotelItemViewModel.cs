using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Models.Hotel
{
    public class HotelItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }
        public int CityId { get; set; }
        public string Image { get; set; }
    }
}
