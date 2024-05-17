using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("tblBookings")]
    public class BookingEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        [ForeignKey("Room")]
        public int RoomId { get; set; }
        [ForeignKey("BookingStatus")]
        public int StatusId { get; set; }
    }
}
