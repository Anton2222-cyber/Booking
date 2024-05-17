using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    public class CityEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [ForeignKey("Contry")]
        public int CountryId { get; set; }
        [ForeignKey("Coordinates")]
        public int CoordinatesId { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
    }
}
