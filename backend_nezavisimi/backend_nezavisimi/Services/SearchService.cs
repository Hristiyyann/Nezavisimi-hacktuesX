using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace backend_nezavisimi.Services;

public class SearchService : ISearchService
{
    public List<NewsModel> SearchArticles(string searchParameters)
    {
        IWebDriver driver = new FirefoxDriver();
        
        var noviniBg = SearchNoviniBg(driver,3,searchParameters);
        
        
        var newsModel = new List<NewsModel>();
        return newsModel;
    }

    private List<NewsModel> SearchNoviniBg(IWebDriver driver, int numberOfArticles, string searchParameters)
    {
        driver.Url = "https://novini.bg/search?txt=" + searchParameters;
        var newsModels = new List<NewsModel>(); // Using a list for dynamic appending
        Thread.Sleep(1000);

        IWebElement buttonToAcceptCookies = driver.FindElement(By.XPath("//*[@id=\"onetrust-accept-btn-handler\"]"));
        buttonToAcceptCookies.Click();
        for (int i = 0; i < numberOfArticles; i++)
        {
            var articleCss = "article.g-grid__item:nth-child(" + (i + 1) + ")";
            var articleLinkCss = "article.g-grid__item:nth-child(" + (i + 1) + ") > a:nth-child(1)";
            var articlePhotoCss = "article.g-grid__item:nth-child(" + (i + 1) + ") > a:nth-child(1) > div:nth-child(1) > picture:nth-child(1) > img:nth-child(2)";
            
            var article = driver.FindElement(By.CssSelector(articleCss));
            var articleLink = driver.FindElement(By.CssSelector(articleLinkCss));
            var articlePhoto = driver.FindElement(By.CssSelector(articlePhotoCss));
            var articleToAdd = new NewsModel()
            {
                Title = article.Text,
                Link = articleLink.GetAttribute("href"),
                Photo = articlePhoto.GetAttribute("src")
            };
            newsModels.Add(articleToAdd);
        }

        return newsModels;
    }
}