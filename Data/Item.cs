using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory.Data {
  public class Item
  {
    public int ItemId { get; set; }
    [Required]
    public string Name { get; set; }
    public int Quantity { get; set; }
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}