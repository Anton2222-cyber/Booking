using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Migrations
{
    /// <inheritdoc />
    public partial class Added_BookingId_and_deleted_HotelId_from_HotelReviews_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HotelReviews_Hotels_HotelId",
                table: "HotelReviews");

            migrationBuilder.DropIndex(
                name: "IX_HotelReviews_UserId",
                table: "HotelReviews");

            migrationBuilder.RenameColumn(
                name: "HotelId",
                table: "HotelReviews",
                newName: "BookingId");

            migrationBuilder.RenameIndex(
                name: "IX_HotelReviews_HotelId",
                table: "HotelReviews",
                newName: "IX_HotelReviews_BookingId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_HotelReviews_UserId_BookingId",
                table: "HotelReviews",
                columns: new[] { "UserId", "BookingId" });

            migrationBuilder.AddForeignKey(
                name: "FK_HotelReviews_Bookings_BookingId",
                table: "HotelReviews",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HotelReviews_Bookings_BookingId",
                table: "HotelReviews");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_HotelReviews_UserId_BookingId",
                table: "HotelReviews");

            migrationBuilder.RenameColumn(
                name: "BookingId",
                table: "HotelReviews",
                newName: "HotelId");

            migrationBuilder.RenameIndex(
                name: "IX_HotelReviews_BookingId",
                table: "HotelReviews",
                newName: "IX_HotelReviews_HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_HotelReviews_UserId",
                table: "HotelReviews",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HotelReviews_Hotels_HotelId",
                table: "HotelReviews",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
