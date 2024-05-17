﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Data.Entities
{
    public class RoomEntity : BaseEntity<int>
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Hotel")]
        public int HotelId { get; set; }
        [StringLength(255)]
        public string RoomType { get; set; }
        public double Price { get; set; }
        [StringLength(255)]
        public string Amenities { get; set; }
    }
}
