using backend_nezavisimi.Auth;

namespace backend_nezavisimi.Services.Interfaces;

public interface ISearchService
{
    public List<NewsModel> SearchArticles(string searchParameters, int? selectedNumberOfArticles, List<string>? selectedMedia);
    public List<NewsModel> ModelByOwnText(string ownText);
}