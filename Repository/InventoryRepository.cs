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

    public IEnumerable<Item> getAll() {
      return this._context.Items.ToList<Item>();
    }
  }
}