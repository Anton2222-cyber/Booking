using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Models.City
{
    public class CityItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public string Image { get; set; }
    }
}
