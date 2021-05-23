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

    public int create(ItemDTO item) 
    {
      var newItem = new Item {Name=item.Name, Quantity=item.Quantity, CatalogItemId=item.CatalogItemId};
      this._context.Items.Add(newItem);
      this._context.SaveChanges();
      return newItem.ItemId;
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
      item.CatalogItemId = newItem.CatalogItemId;
      this._context.SaveChanges();
      return item;
    }

    public IEnumerable<CatalogItem> getCategories()
    {
      return this._context.CatalogItem.Where(c => c.CatalogCode == "item_category_ctg");
    }
  }
}