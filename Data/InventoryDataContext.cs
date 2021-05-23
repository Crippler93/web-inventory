using Microsoft.EntityFrameworkCore;

namespace Inventory.Data {
  public class InventoryDataContext: DbContext 
  {
    public InventoryDataContext(DbContextOptions<InventoryDataContext> options)
      : base(options)
    {}
    public DbSet<Item> Items { get; set; }
    public DbSet<Catalog> Catalogs { get; set; }
  }
}