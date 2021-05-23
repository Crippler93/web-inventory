using System.Collections.Generic;

using Inventory.Data;
using Inventory.Dtos;

namespace Inventory.Repository
{
  public interface IInventoryRepository
  {
    public IEnumerable<Item> getAll();

    public int create(Item item);

    public Item getById(int id);

    public Item editItemById(int id, ItemDTO item);

    public IEnumerable<CatalogItem> getCategories();
  }
}
