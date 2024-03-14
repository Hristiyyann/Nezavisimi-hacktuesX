using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;

namespace backend_nezavisimi.Services;

public class SearchService : ISearchService
{
    public NewsModel[] SearchArticles(string searchParameters)
    {
        var newsModel = new NewsModel[10];
        return newsModel;
    }
}