using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Inventory.Migrations
{
    public partial class addCatalogModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CatalogItemId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Catalogs",
                columns: table => new
                {
                    catalogCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catalogs", x => x.catalogCode);
                });

            migrationBuilder.CreateTable(
                name: "CatalogItem",
                columns: table => new
                {
                    CatalogItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    imageURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    catalogCode = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItem", x => x.CatalogItemId);
                    table.ForeignKey(
                        name: "FK_CatalogItem_Catalogs_catalogCode",
                        column: x => x.catalogCode,
                        principalTable: "Catalogs",
                        principalColumn: "catalogCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CatalogItemId",
                table: "Items",
                column: "CatalogItemId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogItem_catalogCode",
                table: "CatalogItem",
                column: "catalogCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_CatalogItem_CatalogItemId",
                table: "Items",
                column: "CatalogItemId",
                principalTable: "CatalogItem",
                principalColumn: "CatalogItemId",
                onDelete: ReferentialAction.Restrict);
            
            migrationBuilder.InsertData(
                table: "Catalogs",
                columns: new[] {"catalogCode", "description"},
                values: new object[,]
                {
                    {"item_category_ctg", "Categories for Items form"},
                    {"reason_ctg", "Catalog of reasons of update Item"}
                }
            );

            migrationBuilder.InsertData(
                table: "CatalogItem",
                columns: new[] {"CatalogItemId", "value", "description", "imageURL", "catalogCode"},
                values: new object[,]
                {
                    {1, "Meat", "Raw meat of animals", "", "item_category_ctg"},
                    {2, "Fruit", "Any kind of fruit", "", "item_category_ctg"},
                    {3, "Plastic", "Items made of plastic", "", "item_category_ctg"},
                    {4, "Input", "New input of items", "", "reason_ctg"},
                    {5, "Output", "New ouput of items", "", "reason_ctg"},
                }
            );

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Name", "Quantity", "CatalogItemId", "created_at"},
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
                name: "FK_Items_CatalogItem_CatalogItemId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "CatalogItem");

            migrationBuilder.DropTable(
                name: "Catalogs");

            migrationBuilder.DropIndex(
                name: "IX_Items_CatalogItemId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CatalogItemId",
                table: "Items");
        }
    }
}
