namespace Inventory.Data
{
  public class CatalogItem
  {
    public int CatalogItemId { get; set; }
    public string value { get; set; }
    public string description { get; set; }
    public string imageURL { get; set; }
    public string CatalogCode { get; set; }
    public Catalog Catalog { get; set; }
  }
}