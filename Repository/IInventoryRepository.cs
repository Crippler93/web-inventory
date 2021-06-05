using System.Collections.Generic;
using System.Threading.Tasks;
using Inventory.Data;
using Inventory.Dtos;

namespace Inventory.Repository
{
  public interface IInventoryRepository
  {
    public Task<List<Item>> getAll();

    public Task<Item> create(Item item);

    public Task<Item> getById(int id);

    public Item editItemById(int id, ItemDTO item);

    public IEnumerable<CatalogItem> getCategories(string code);

    public Task<CatalogItem> getCategoryById(int id);

    public Item addEntry(int id, EntryDTO entryDTO);
  }
}
