using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Inventory.Data
{
  public class Catalog
  {
    [Key]
    public string catalogCode { get; set; }
    [Required]
    public string description { get; set; }
    public List<CatalogItem> items { get; set; }
  }
}