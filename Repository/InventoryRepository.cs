using System.Collections.Generic;
using System.Linq;
using Inventory.Data;
using Microsoft.EntityFrameworkCore;

using Inventory.Dtos;

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
      return this._context.Items.Include(i => i.CatalogItem).FirstOrDefault(i => i.ItemId == id);
    }

    public Item editItemById(int id, ItemDTO newItem)
    {
      var item = this._context.Items.Find(id);
      if (item == null) {
        return null;
      }
      item.Name = newItem.Name;
      item.Quantity = newItem.Quantity;
      this._context.SaveChanges();
      return item;
    }

    public IEnumerable<CatalogItem> getCategories()
    {
      return this._context.CatalogItem.Where(c => c.CatalogCode == "item_category_ctg");
    }
  }
}