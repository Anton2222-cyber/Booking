using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.City;

public class CityFilterVm : PaginationVm {
	public string? Name { get; set; }

	public double? Longitude { get; set; }
	public double? Latitude { get; set; }

	public double? MinLongitude { get; set; }
	public double? MaxLongitude { get; set; }
	public double? MinLatitude { get; set; }
	public double? MaxLatitude { get; set; }

	public long? CountryId { get; set; }
}
