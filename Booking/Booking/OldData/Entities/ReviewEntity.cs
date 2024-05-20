using BlogWebApi.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    [Table("Reviews")]
    public class ReviewEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }
        public virtual HotelEntity Hotel { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual UserEntity User { get; set; }
        public double Rating { get; set; }
        [StringLength(4000)]
        public string Comment { get; set; }
    }
}
