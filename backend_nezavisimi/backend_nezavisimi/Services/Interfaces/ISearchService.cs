using backend_nezavisimi.Auth;

namespace backend_nezavisimi.Services.Interfaces;

public interface ISearchService
{
    public NewsModel[] SearchArticles(string searchParameters);
}