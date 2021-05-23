using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Inventory.Migrations
{
    public partial class addCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CategoryId",
                table: "Items",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
            
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Name"},
                values: new object[,] 
                {
                    { 1, "Meat" },
                    { 2, "Cereal" },
                    { 3, "Fruit" },
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Name", "Quantity", "CategoryId", "created_at"},
                values: new object[,]
                {
                    { "Ribeye", 10, 1, DateTime.Now },
                    { "Chocapic", 5, 2, DateTime.Now },
                    { "Apples", 10, 3, DateTime.Now }
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Items_CategoryId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Items");
        }
    }
}
