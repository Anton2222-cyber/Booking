namespace Booking.ViewModels.Pagination;

public class PageVm<T> {
	public ICollection<T> Data { get; set; } = null!;

	public int PagesAvailable { get; set; }
}
