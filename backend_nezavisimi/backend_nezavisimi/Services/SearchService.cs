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
        var pikBg = SearchPikBg(driver,3,searchParameters);
        var frogNews = SearchFrogNews(driver, 3, searchParameters);
        
        
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

    private List<NewsModel> SearchPikBg(IWebDriver driver, int numberOfArticles, string searchParameters)
    {
        driver.Url = "https://pik.bg/" + searchParameters.Replace(" ", "-") + "-search.html";
        var newsModels = new List<NewsModel>(); 
        Thread.Sleep(1000);
        
        IWebElement buttonToAcceptCookies = driver.FindElement(By.XPath("//*[@id=\"qc-cmp2-ui\"]/div[2]/div/button[2]"));
        buttonToAcceptCookies.Click();
        for (int i = 0; i < numberOfArticles; i++)
        {
            var articleCss = "body > main > div.container-wrap > div > div > div.left.w100.mt30 > div > div.col-lg-9 > div > div:nth-child(1) > div:nth-child(" + (i + 2) + ")";
            var articleLinkCss = "body > main > div.container-wrap > div > div > div.left.w100.mt30 > div > div.col-lg-9 > div > div:nth-child(1) > div:nth-child(" + (i + 2) + ") > a";
            var articlePhotoCss = "body > main > div.container-wrap > div > div > div.left.w100.mt30 > div > div.col-lg-9 > div > div:nth-child(1) > div:nth-child(" + (i + 2) + ")> a > picture > img";
            
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
    
   private List<NewsModel> SearchFrogNews(IWebDriver driver, int numberOfArticles, string searchParameters)
   {
       driver.Url = "https://frognews.bg/search/?search=" + searchParameters.Replace(" ", "+") +
                    "&submitsearch=&action=search";
       var newsModels = new List<NewsModel>();
       Thread.Sleep(3000);

       IWebElement buttonToAcceptCookies =
           driver.FindElement(By.CssSelector("body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-footer-buttons-container > div.fc-footer-buttons > button.fc-button.fc-cta-consent.fc-primary-button"));
       buttonToAcceptCookies.Click();

       for (int i = 0; i < numberOfArticles; i++)
       {
           var articleCss =
               "body > div.content > div > div > div.search-news-left.brc > div > div.search-news-area > a.item.img5txt5.moretxt.num" +
               (i + 1);
           var articlePhotoCss =
               "body > div.content > div > div > div.search-news-left.brc > div > div.search-news-area > a.item.img5txt5.moretxt.num" + (i+1) + " > span.plhldr > img";

           var article = driver.FindElement(By.CssSelector(articleCss));
           var articlePhoto = driver.FindElement(By.CssSelector(articlePhotoCss));
           var title = article.Text.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None).LastOrDefault();
           var articleToAdd = new NewsModel()
           {
               Title = title,
               Link = article.GetAttribute("href"),
               Photo = articlePhoto.GetAttribute("src")
           };
           newsModels.Add(articleToAdd);
       }

       return newsModels;
   }
}