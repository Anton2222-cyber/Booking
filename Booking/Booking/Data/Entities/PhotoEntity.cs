using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Booking.Data.Entities
{
    [Table("Photos")]
    public class PhotoEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FilePath { get; set; }
        [Required]
        public int Priority { get; set; }
        [Required]
        public int RoomId { get; set; }
        public virtual RoomEntity Room { get; set; }
    }
}