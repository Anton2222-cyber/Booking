using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Data.Entities
{
    [Table("RoomPhotos")]
    public class PhotoEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string FilePath { get; set; }
        public int Priority { get; set; }
        [ForeignKey("Room")]
        public int RoomId { get; set; }
        public virtual RoomEntity Room { get; set; }
    }
}