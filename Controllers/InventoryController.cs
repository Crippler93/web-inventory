using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

using Inventory.Repository;
using Inventory.Data;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController: ControllerBase
    {
      private IInventoryRepository _repo;
      public InventoryController(IInventoryRepository repo)
      {
          _repo = repo;
      }

      [HttpGet]
      public IEnumerable<Item> getItems() {
        return this._repo.getAll();
      } 

      [HttpPost]
      public int createItem(Item item) {
        return this._repo.create(item);
      }

      [HttpGet("{id:int}")]
      public IActionResult getItem(int id)
      {
        var item = this._repo.getById(id);
        if (item == null) 
        {
          return NotFound();
        }
        return Ok(item);
      }
    }
}