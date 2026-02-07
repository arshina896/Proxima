using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProximaApi.Migrations
{
    /// <inheritdoc />
    public partial class editService : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Users_ServiceProviderId",
                table: "Services");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceProviders_ServiceProviderId",
                table: "Services",
                column: "ServiceProviderId",
                principalTable: "ServiceProviders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceProviders_ServiceProviderId",
                table: "Services");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Users_ServiceProviderId",
                table: "Services",
                column: "ServiceProviderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
