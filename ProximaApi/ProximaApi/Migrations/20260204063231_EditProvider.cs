using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProximaApi.Migrations
{
    /// <inheritdoc />
    public partial class EditProvider : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ServiceProviders_UserId",
                table: "ServiceProviders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceProviders_Users_UserId",
                table: "ServiceProviders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceProviders_Users_UserId",
                table: "ServiceProviders");

            migrationBuilder.DropIndex(
                name: "IX_ServiceProviders_UserId",
                table: "ServiceProviders");
        }
    }
}
