using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.HotelPhoto
{
    public class HotelPhotoFilterVm : PaginationVm
    {
        public int? Priority { get; set; }
        public int? MinPriority { get; set; }
        public int? MaxPriority { get; set; }

        public long? HotelId { get; set; }

        public bool? IsRandomItems { get; set; }
    }
}
