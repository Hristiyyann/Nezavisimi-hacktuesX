using backend_nezavisimi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend_nezavisimi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace backend_nezavisimi.Controllers
{
    [Route("api/keyword")]
    [ApiController]
    public class KeywordController : ControllerBase
    {
        private readonly IKeywordService _keywordService;
        private readonly UserManager<IdentityUser> _userManager;

        public KeywordController(IKeywordService keywordService, UserManager<IdentityUser> userManager)
        {
            _keywordService = keywordService;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetKeywords()
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _keywordService.GetKeywords(user.Id);
            
            return Ok(result); 
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddKeyword([FromBody] KeywordAddModel keyword)
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _keywordService.AddKeyword(user.Id, keyword.Keyword);
            
            return Ok(result);
        }
        
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteKeyword([FromBody] KeywordAddModel keyword)
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _keywordService.DeleteKeyword(user.Id, keyword.Keyword);
            
            return Ok(result);
        }
        
        [HttpGet]
        [AllowAnonymous]
        [Route("{id}")]
        public async Task<IActionResult> GetKeyword([FromRoute] string id)
        {
            var result = await _keywordService.GetKeywords(id);
            
            return Ok(result);
        }
        
        
        
        
    }
}