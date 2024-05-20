using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("Cities")]
    public class CityEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [ForeignKey("Contry")]
        public int CountryId { get; set; }
        public virtual CountryEntity Country { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
    }
}
