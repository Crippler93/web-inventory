using System.Collections.Generic;

using Inventory.Data;

namespace Inventory.Repository
{
  public interface IInventoryRepository
  {
    public IEnumerable<Item> getAll();
  }
}
