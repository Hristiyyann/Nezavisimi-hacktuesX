using backend_nezavisimi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend_nezavisimi.Controllers
{
    [Route("search/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }
        
        [HttpPost]
        [Route("search")]
        public Task<IActionResult> Search([FromBody]string model)
        {
            var result = _searchService.SearchArticles(model);
            return Task.FromResult<IActionResult>(Ok(result));
        }

    }
}