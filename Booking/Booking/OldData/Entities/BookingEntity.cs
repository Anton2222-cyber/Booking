using BlogWebApi.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("Bookings")]
    public class BookingEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual UserEntity User { get; set; }
        [ForeignKey("Room")]
        public int RoomId { get; set; }
        public virtual RoomEntity Room { get; set; }
        [ForeignKey("Status")]
        public int StatusId { get; set; }
        public virtual BookingStatusEntity Status { get; set; }
    }
}
