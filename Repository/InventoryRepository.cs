using System.Collections.Generic;
using System.Linq;
using Inventory.Data;

namespace Inventory.Repository {
  public class InventoryRepository: IInventoryRepository {

    private InventoryDataContext _context;

    public InventoryRepository(InventoryDataContext context)
    {
      _context = context;
    }

    public IEnumerable<Item> getAll() 
    {
      return this._context.Items.ToList<Item>();
    }

    public int create(Item item) 
    {
      this._context.Items.Add(item);
      this._context.SaveChanges();
      return item.ItemId;
    }

    public Item getById(int id)
    {
      return this._context.Items.Find(id);
    }
  }
}