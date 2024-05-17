using System.ComponentModel.DataAnnotations;

namespace Booking.Data.Entities
{
    public class CountryEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [StringLength(255)]
        public string Name { get; set; }
    }
}
