namespace Inventory.Dtos
{
    public class ItemDTO
    {
      public string Name { get; set; }
      public int CatalogItemId { get; set; }
    }

    public class EntryDTO
    {
      public int Quantity { get; set; }
    }
}