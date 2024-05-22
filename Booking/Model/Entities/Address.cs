namespace Model.Entities;

public class Address {
	public long Id { get; set; }

	public string Street { get; set; } = null!;

	public string HouseNumber { get; set; } = null!;

	public long CityId { get; set; }
	public City City { get; set; } = null!;
}
