using System.ComponentModel.DataAnnotations;

namespace Inventory.Data
{
    public class FieldSetup 
    {
      [Key]
      public int FieldSetupId { get; set; }
      public int Position { get; set; }
      public string KeyName { get; set; }
      public string Label { get; set; }
      public string type { get; set; }
      public virtual Catalog Catalog { get; set; }
    }
}