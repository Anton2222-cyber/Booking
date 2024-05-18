using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Booking.Migrations {
	/// <inheritdoc />
	public partial class Initial : Migration {
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder) {
			migrationBuilder.CreateTable(
				name: "Countries",
				columns: table => new {
					Id = table.Column<long>(type: "bigint", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					Image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
				},
				constraints: table => {
					table.PrimaryKey("PK_Countries", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "Cities",
				columns: table => new {
					Id = table.Column<long>(type: "bigint", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					Image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					Longitude = table.Column<double>(type: "double precision", nullable: false),
					Latitude = table.Column<double>(type: "double precision", nullable: false),
					CountryId = table.Column<long>(type: "bigint", nullable: false)
				},
				constraints: table => {
					table.PrimaryKey("PK_Cities", x => x.Id);
					table.ForeignKey(
						name: "FK_Cities_Countries_CountryId",
						column: x => x.CountryId,
						principalTable: "Countries",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Addresses",
				columns: table => new {
					Id = table.Column<long>(type: "bigint", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Street = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					HouseNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
					CityId = table.Column<long>(type: "bigint", nullable: false),
					City = table.Column<string>(type: "text", nullable: false)
				},
				constraints: table => {
					table.PrimaryKey("PK_Addresses", x => x.Id);
					table.ForeignKey(
						name: "FK_Addresses_Cities_CityId",
						column: x => x.CityId,
						principalTable: "Cities",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Hotels",
				columns: table => new {
					Id = table.Column<long>(type: "bigint", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
					Rating = table.Column<double>(type: "double precision", nullable: false),
					AddressId = table.Column<long>(type: "bigint", nullable: false)
				},
				constraints: table => {
					table.PrimaryKey("PK_Hotels", x => x.Id);
					table.ForeignKey(
						name: "FK_Hotels_Addresses_AddressId",
						column: x => x.AddressId,
						principalTable: "Addresses",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "HotelPhotos",
				columns: table => new {
					Id = table.Column<long>(type: "bigint", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
					Priority = table.Column<int>(type: "integer", nullable: false),
					HotelId = table.Column<long>(type: "bigint", nullable: false)
				},
				constraints: table => {
					table.PrimaryKey("PK_HotelPhotos", x => x.Id);
					table.ForeignKey(
						name: "FK_HotelPhotos_Hotels_HotelId",
						column: x => x.HotelId,
						principalTable: "Hotels",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Addresses_CityId",
				table: "Addresses",
				column: "CityId");

			migrationBuilder.CreateIndex(
				name: "IX_Cities_CountryId",
				table: "Cities",
				column: "CountryId");

			migrationBuilder.CreateIndex(
				name: "IX_HotelPhotos_HotelId",
				table: "HotelPhotos",
				column: "HotelId");

			migrationBuilder.CreateIndex(
				name: "IX_Hotels_AddressId",
				table: "Hotels",
				column: "AddressId");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder) {
			migrationBuilder.DropTable(
				name: "HotelPhotos");

			migrationBuilder.DropTable(
				name: "Hotels");

			migrationBuilder.DropTable(
				name: "Addresses");

			migrationBuilder.DropTable(
				name: "Cities");

			migrationBuilder.DropTable(
				name: "Countries");
		}
	}
}
