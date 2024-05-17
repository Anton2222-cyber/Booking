using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    public class HotelEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Address { get; set; }
        [StringLength(255)]
        public string Description { get; set; }
        public double Rating { get; set; }
        [ForeignKey("City")]
        public int CityId { get; set; }
        public virtual CityEntity City { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        public virtual ICollection<PhotoEntity> Photos { get; set; }
    }
}
