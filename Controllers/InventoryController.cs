using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

using Inventory.Repository;
using Inventory.Data;
using Inventory.Dtos;
using System.Threading.Tasks;

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
      public async Task<ActionResult<List<Item>>> getItems() {
        return await this._repo.getAll();
      } 

      [HttpPost]
      public async  Task<ActionResult<ItemDTO>> createItem(ItemDTO item) {
        var newItem = new Item {Name=item.Name, CatalogItemId=item.CatalogItemId};

        await this._repo.create(newItem);

        var itemDTO = new ItemDTO {Name=newItem.Name, CatalogItemId=newItem.CatalogItemId};

        return CreatedAtAction(nameof(getItem), new { id = newItem.ItemId}, itemDTO);
      }

      [HttpGet("{id:int}")]
      public async Task<IActionResult> getItem(int id)
      {
        var item = await this._repo.getById(id);
        if (item == null) 
        {
          return NotFound();
        }
        return Ok(item);
      }

      [HttpPut("{id:int}")]
      public IActionResult editItem(int id, ItemDTO item)
      {
        var result = this._repo.editItemById(id, item);
        if (result == null) {
          return NotFound();
        }
        return Ok(result);
      }

      [HttpGet("categories")]
      public IEnumerable<CatalogItem> getCategories([FromQuery()] string name)
      {
        return this._repo.getCategories(name);
      }

      [HttpGet("categories/{id:int}")]
      public async Task<IActionResult> getCategoryById(int id)
      {
        var item = await this._repo.getCategoryById(id);
        if (item == null) 
        {
          return NotFound();
        }
        return Ok(item);
      }

      [HttpPost("entry/{id:int}")]
      public IActionResult addQuantity(int id, EntryDTO entryDTO)
      {
        var item = this._repo.addEntry(id, entryDTO);
        if (item == null)
        {
          return NotFound();
        }
        return Ok(item);
      }
    }
}