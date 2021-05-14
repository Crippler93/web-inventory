using System.Linq;

namespace Inventory.Data
{
    public static class DbInitializer
    {
      public static void Initialize(InventoryDataContext context) 
      {
        context.Database.EnsureCreated();

        if(context.Items.Any())
        {
          return;
        }

        var items = new Item[]
        {
          new Item{Name="Item #1", Quantity=3},
          new Item{Name="Item #2", Quantity=1},
          new Item{Name="Item #3", Quantity=10},
        };

        foreach (var item in items)
        {
            context.Items.Add(item);
        }
        context.SaveChanges();
      }
    }
}