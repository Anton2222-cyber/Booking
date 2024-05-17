using System.ComponentModel.DataAnnotations;

namespace Booking.Data.Entities
{
    public class CoordinatesEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
    }
}
