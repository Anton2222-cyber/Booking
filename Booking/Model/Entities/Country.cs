namespace Model.Entities;

public class Country {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Image { get; set; } = null!;

	public ICollection<City> Cities { get; set; } = null!;
}
