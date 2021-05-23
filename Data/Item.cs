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
    [Required]
    public virtual Category Category { get; set; }
  }
}