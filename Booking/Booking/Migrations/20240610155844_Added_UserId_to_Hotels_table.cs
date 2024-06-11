using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Migrations
{
    /// <inheritdoc />
    public partial class Added_UserId_to_Hotels_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Hotels",
                type: "bigint",
                nullable: false,
                defaultValue: 1L);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_UserId",
                table: "Hotels",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_AspNetUsers_UserId",
                table: "Hotels",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_AspNetUsers_UserId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_UserId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Hotels");
        }
    }
}
