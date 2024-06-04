using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Booking.Migrations
{
    /// <inheritdoc />
    public partial class Added_HotelTypes_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TypeId",
                table: "Hotels",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "HotelTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_TypeId",
                table: "Hotels",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_HotelTypes_TypeId",
                table: "Hotels",
                column: "TypeId",
                principalTable: "HotelTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_HotelTypes_TypeId",
                table: "Hotels");

            migrationBuilder.DropTable(
                name: "HotelTypes");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_TypeId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Hotels");
        }
    }
}
