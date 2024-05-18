namespace Model.Entities;

public class City {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Image { get; set; } = null!;

	public double Longitude { get; set; }

	public double Latitude { get; set; }

	public long CountryId { get; set; }
	public Country Country { get; set; } = null!;

	public ICollection<Address> Addresses { get; set; } = null!;
}
