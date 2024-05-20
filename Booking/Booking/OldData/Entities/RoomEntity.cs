using BlogWebApi.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("Rooms")]
    public class RoomEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }
        public virtual HotelEntity Hotel { get; set; }
        [StringLength(255)]
        public string RoomType { get; set; }
        public double Price { get; set; }
        [StringLength(255)]
        public string Amenities { get; set; }
        public virtual ICollection<PhotoEntity> Photos { get; set; }
    }
}
