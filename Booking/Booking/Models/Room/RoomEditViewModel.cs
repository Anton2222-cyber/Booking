namespace Booking.Models.Room
{
    public class RoomPhotos
    {
        public string Photo { get; set; }
        public int Priority { get; set; }

    }

    public class RoomEditViewModel
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public string RoomType { get; set; }
        public double Price { get; set; }
        public string Amenities { get; set; }

        public List<RoomPhotos> Photos { get; set; }

        public List<RoomPhotos> NewPhotos { get; set; }
    }
}
