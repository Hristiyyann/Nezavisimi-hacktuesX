using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend_nezavisimi.Auth
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Party> Parties { get; set; }
        public DbSet<Keyword> Keywords { get; set; }

        public ApplicationDbContext() { }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {  
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Party>().HasData(
                new Party()
                {
                    Id = "1",
                    Name = "ГЕРБ",
                    HexColor = "#4F93C9",
                    IsActive = true
                },
                new Party()
                {
                    Id = "2",
                    Name = "БСП",
                    HexColor = "#D71A1A",
                    IsActive = true
                },
                new Party()
                {
                    Id="3",
                    Name="Възраждане",
                    HexColor="#0F3B26",
                    IsActive=true
                },
                new Party()
                {
                    Id="4",
                    Name="ПП-ДБ",
                    HexColor="#4200FF",
                    IsActive=true
                },
                new Party()
                {
                    Id="5",
                    Name="ДПС",
                    HexColor="#0066B7",
                    IsActive=true
                },
                new Party()
                {
                    Id="6",
                    Name="ИТН",
                    HexColor="#4BB9DE",
                    IsActive=true
                }
            );
        }

    }
}
