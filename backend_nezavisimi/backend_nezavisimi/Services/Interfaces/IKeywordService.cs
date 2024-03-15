using backend_nezavisimi.Auth;

namespace backend_nezavisimi.Services.Interfaces;

public interface IKeywordService
{
    public Task<List<Keyword>> GetKeywords(string userId);
    public Task<int> AddKeyword(string userId, KeywordModel keyword);
    public Task<Keyword> DeleteKeyword(string userId, string keyword);
    public Task<Keyword> GetKeyword(string userId, string keyword);
    public Task<Keyword> UpdateKeyword(string userId, string keyword);
}