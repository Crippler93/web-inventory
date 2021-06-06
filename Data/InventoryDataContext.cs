using Microsoft.EntityFrameworkCore;

namespace Inventory.Data {
  public class InventoryDataContext: DbContext 
  {
    public InventoryDataContext(DbContextOptions<InventoryDataContext> options)
      : base(options)
    {}
    public DbSet<Item> Items { get; set; }
    public DbSet<Catalog> Catalogs { get; set; }
    public DbSet<CatalogItem> CatalogItem { get; set; }
    public DbSet<FieldSetup> FieldSetup { get; set; }
  }
}