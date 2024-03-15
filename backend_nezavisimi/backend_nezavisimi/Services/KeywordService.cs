using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend_nezavisimi.Services;

public class KeywordService : IKeywordService
{
    private readonly ApplicationDbContext _context;
    
    public KeywordService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public Task<List<Keyword>> GetKeywords(string userId)
    {
        return _context.Keywords.Where(x => x.UserId == userId).ToListAsync();
    }
    
    public Task<int> AddKeyword(string userId, KeywordModel keyword)
    {
        var newKeyword = new Keyword
        {
            Name = keyword.Keyword,
            UserId = userId
        };
        _context.Keywords.Add(newKeyword);
        return _context.SaveChangesAsync();
    }
    
    public Task<Keyword> DeleteKeyword(string userId, string keyword)
    {
        throw new NotImplementedException();
    }
    
    public Task<Keyword> GetKeyword(string userId, string keyword)
    {
        throw new NotImplementedException();
    }
    
    public Task<Keyword> UpdateKeyword(string userId, string keyword)
    {
        throw new NotImplementedException();
    }
    
}