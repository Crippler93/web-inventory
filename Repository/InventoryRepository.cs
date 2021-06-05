using System.Collections.Generic;
using System.Linq;
using Inventory.Data;
using Microsoft.EntityFrameworkCore;

using Inventory.Dtos;
using System.Threading.Tasks;

namespace Inventory.Repository {
  public class InventoryRepository: IInventoryRepository {

    private InventoryDataContext _context;

    public InventoryRepository(InventoryDataContext context)
    {
      _context = context;
    }

    public Task<List<Item>> getAll() 
    {
      return this._context.Items.ToListAsync<Item>();
    }

    public async Task<Item> create(Item item) 
    {
      this._context.Items.Add(item);
      await this._context.SaveChangesAsync();
      return item;
    }

    public Task<Item> getById(int id)
    {
      return this._context.Items.Include(i => i.CatalogItem).FirstOrDefaultAsync(i => i.ItemId == id);
    }

    public Item editItemById(int id, ItemDTO newItem)
    {
      var item = this._context.Items.Find(id);
      if (item == null) {
        return null;
      }
      item.Name = newItem.Name;
      item.CatalogItemId = newItem.CatalogItemId;
      this._context.SaveChanges();
      return item;
    }

    public IEnumerable<CatalogItem> getCategories(string code)
    {
      if (code == "all") {
        return this._context.CatalogItem.ToList();
      }
      return this._context.CatalogItem.Where(c => c.CatalogCode == code);
    }

    public Item addEntry(int id, EntryDTO entryDTO)
    {
      var item = this._context.Items.Find(id);
      if (item == null)
      {
        return null;
      }
      item.Quantity = item.Quantity + entryDTO.Quantity;
      this._context.SaveChanges();
      return item;
    }

    public Task<CatalogItem> getCategoryById(int id)
    {
      return this._context.CatalogItem.FirstOrDefaultAsync(i => i.CatalogItemId == id);
    }
  }
}