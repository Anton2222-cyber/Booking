using System.ComponentModel.DataAnnotations;

namespace Booking.Data.Entities
{
    public class BookingStatusEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(255)]
        public string Status { get; set; }
    }
}
