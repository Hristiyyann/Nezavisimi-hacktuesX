using backend_nezavisimi.Auth;

namespace backend_nezavisimi.Services.Interfaces;

public interface IKeywordService
{
    public Task<List<Keyword>> GetKeywords(string userId);
    public Task<Keyword> AddKeyword(string userId, string keyword);
    public Task<int> DeleteKeyword(string userId, string keyword);
    public Task<int> UpdateKeyword(string userId, KeywordModel keyword);
}