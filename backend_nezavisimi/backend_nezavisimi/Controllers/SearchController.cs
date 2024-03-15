using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_nezavisimi.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }
        
        [HttpGet]
        public Task<IActionResult> Search([FromQuery]SearchModel model)
        {
            var result = _searchService.SearchArticles(model.SearchPreference);
            return Task.FromResult<IActionResult>(Ok(result));
        }

    }
}