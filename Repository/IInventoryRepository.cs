using System.Collections.Generic;

using Inventory.Data;

namespace Inventory.Repository
{
  public interface IInventoryRepository
  {
    public IEnumerable<Item> getAll();

    public int create(Item item);

    public Item getById(int id);

    public Item editItemById(int id, Item item);
  }
}
