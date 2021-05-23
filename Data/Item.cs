using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Data {
  public class Item
  {
    public int ItemId { get; set; }
    [Required]
    [MinLength(2)]
    public string Name { get; set; }
    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int CatalogItemId { get; set; }
    [Required]
    public virtual CatalogItem CatalogItem { get; set; }
  }
}