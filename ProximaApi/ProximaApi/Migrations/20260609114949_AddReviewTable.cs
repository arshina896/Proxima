using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProximaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_ServiceProviderUserId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "ServiceProviderUserId",
                table: "Reviews",
                newName: "ServiceProviderId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_ServiceProviderUserId",
                table: "Reviews",
                newName: "IX_Reviews_ServiceProviderId");

            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ServiceId",
                table: "Reviews",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ServiceProviders_ServiceProviderId",
                table: "Reviews",
                column: "ServiceProviderId",
                principalTable: "ServiceProviders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Services_ServiceId",
                table: "Reviews",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ServiceProviders_ServiceProviderId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Services_ServiceId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ServiceId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "ServiceProviderId",
                table: "Reviews",
                newName: "ServiceProviderUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_ServiceProviderId",
                table: "Reviews",
                newName: "IX_Reviews_ServiceProviderUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_ServiceProviderUserId",
                table: "Reviews",
                column: "ServiceProviderUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
