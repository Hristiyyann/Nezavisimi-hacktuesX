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
    
    public Task<int> AddKeyword(string userId, string keyword)
    {
        var newKeyword = new Keyword
        {
            Name = keyword,
            UserId = userId
        };
        _context.Keywords.Add(newKeyword);
        return _context.SaveChangesAsync();
    }
    
    public Task<int> DeleteKeyword(string userId, string keyword)
    {
        var keywordToDelete = _context.Keywords.FirstOrDefault(x => x.UserId == userId && x.Name == keyword);
        if (keywordToDelete == null)
        {
            throw new Exception("Keyword not found");
        }
        _context.Keywords.Remove(keywordToDelete);
        return _context.SaveChangesAsync();
    }
    
    public Task<int> UpdateKeyword(string userId, KeywordModel keyword)
    {
        var keywordToUpdate = _context.Keywords.FirstOrDefault(x => x.UserId == userId && x.Id == keyword.Guid);
        if (keywordToUpdate == null)
        {
            throw new Exception("Keyword not found");
        }
        keywordToUpdate.Name = keyword.Keyword;
        return _context.SaveChangesAsync();
    }
    
}