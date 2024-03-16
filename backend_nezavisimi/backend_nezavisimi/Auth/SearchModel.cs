namespace backend_nezavisimi.Auth;

public class SearchModel
{
    public string SearchPreference { get; set; }
    public List<string>? selectedMedia { get; set; }
    public int? selectedNumberOfArticles { get; set; }
}