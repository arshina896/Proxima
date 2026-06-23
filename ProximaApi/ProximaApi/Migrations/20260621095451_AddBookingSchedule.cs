using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProximaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingSchedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ServiceDate",
                table: "Bookings",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimeSlot",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceDate",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "TimeSlot",
                table: "Bookings");
        }
    }
}
