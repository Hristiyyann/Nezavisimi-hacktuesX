using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_nezavisimi.Migrations
{
    public partial class PartiesSupportAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parties",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    HexColor = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parties", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Parties",
                columns: new[] { "Id", "HexColor", "IsActive", "Name" },
                values: new object[,]
                {
                    { "1", "#4F93C9", true, "ГЕРБ" },
                    { "2", "#D71A1A", true, "БСП" },
                    { "3", "#0F3B26", true, "Възраждане" },
                    { "4", "#4200FF", true, "ПП-ДБ" },
                    { "5", "#0066B7", true, "ДПС" },
                    { "6", "#4BB9DE", true, "ИТН" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parties");
        }
    }
}
