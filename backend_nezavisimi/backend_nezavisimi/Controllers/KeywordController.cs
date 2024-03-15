using backend_nezavisimi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend_nezavisimi.Auth;

namespace backend_nezavisimi.Controllers
{
    [Route("api/keyword")] // Ensure the route is correctly prefixed with 'api/' if it's an API controller
    [ApiController]
    public class KeywordController : ControllerBase
    {
        private readonly IKeywordService _keywordService;

        public KeywordController(IKeywordService keywordService)
        {
            _keywordService = keywordService;
        }

        [HttpGet]
        public async Task<IActionResult> GetKeywords([FromQuery] string userId)
        {
            var result = await _keywordService.GetKeywords(userId);
            return Ok(result); // Directly return the result without wrapping it in Task.FromResult
        }

        [HttpPost]
        public async Task<IActionResult> AddKeyword([FromBody] KeywordModel keyword, [FromQuery] string userId)
        {
            var result = await _keywordService.AddKeyword(userId, keyword); // Note the order of parameters
            return Ok(result); // Directly return the result without wrapping it in Task.FromResult
        }
    }
}