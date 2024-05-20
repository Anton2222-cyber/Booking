using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("Booking_Status")]
    public class BookingStatusEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(255)]
        public string Status { get; set; }
    }
}
