using System.Text.RegularExpressions;
using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;
using Newtonsoft.Json.Schema;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace backend_nezavisimi.Services;

public class SearchService : ISearchService
{
    public List<NewsModel> SearchArticles(string searchParameters)
    {
        IWebDriver driver = new FirefoxDriver();
        var newsModel = new List<NewsModel>();

        bool isUrl = IsUrl(searchParameters);

        if (isUrl)
        {
            bool isFromNoviniBg = IsUrlFromSpecificDomain(searchParameters, "novini.bg");
            bool isFromPikBg = IsUrlFromSpecificDomain(searchParameters, "pik.bg");

            if (isFromNoviniBg)
            { 
                var newsModelUrl = SearchNoviniBg(driver, 1, searchParameters, true);   
                newsModel.Add(newsModelUrl.First());
            }
            else if (isFromPikBg)
            {
                var newsModelUrl = SearchPikBg(driver, 1, searchParameters,true);
                newsModel.Add(newsModelUrl.First());
            }
        }
        else
        {
            var noviniBg = SearchNoviniBg(driver,3,searchParameters);
            foreach (var news in noviniBg)
            {
                if (news.Link != null)
                {
                    var articleToAdd = ExtractTextNoviniBg(driver, news.Link);
                    newsModel.Add(articleToAdd);
                }
            }
            var pikBg = SearchPikBg(driver,3,searchParameters);
            foreach (var news in pikBg)
            {
                if (news.Link != null)
                {
                    var articleToAdd = TextExtractPikBg(driver, news.Link);
                    newsModel.Add(articleToAdd);
                }
            }
            var frogNews = SearchFrogNews(driver, 3, searchParameters);
        }
        
        return newsModel;
    }

    #region Utils
    public static bool IsUrl(string input)
    {
        string pattern = @"^(http|https|ftp)://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$";
        Regex regex = new Regex(pattern, RegexOptions.IgnoreCase);
        return regex.IsMatch(input);
    }
    
    public static bool IsUrlFromSpecificDomain(string inputUrl, string domain)
    {
        try
        {
            Uri uri = new Uri(inputUrl);
            return uri.Host.EndsWith(domain, StringComparison.OrdinalIgnoreCase);
        }
        catch (UriFormatException)
        {
            return false;
        }
    }
    #endregion

    #region NewsSearch
    private List<NewsModel> SearchNoviniBg(IWebDriver driver, int numberOfArticles, string searchParameters, bool isUrl = false)
    {
        if (isUrl)
        {
            var newsModelUrl = new List<NewsModel>();
            var articleToAdd = ExtractTextNoviniBg(driver, searchParameters);
            newsModelUrl.Add(articleToAdd);
            return newsModelUrl;
        }
        driver.Url = "https://novini.bg/search?txt=" + searchParameters;
        var newsModels = new List<NewsModel>(); 
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
    private List<NewsModel> SearchPikBg(IWebDriver driver, int numberOfArticles, string searchParameters, bool isUrl = false)
    {
        if (isUrl)
        {
            var newsModelUrl = new List<NewsModel>();
            var articleToAdd = TextExtractPikBg(driver, searchParameters);
            newsModelUrl.Add(articleToAdd);
            return newsModelUrl;
        }

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
    
   private List<NewsModel> SearchFrogNews(IWebDriver driver, int numberOfArticles, string searchParameters, bool isUrl = false)
   {
       driver.Url = "https://frognews.bg/search/?search=" + searchParameters.Replace(" ", "+") +
                    "&submitsearch=&action=search";
       var newsModels = new List<NewsModel>();
       Thread.Sleep(3000);

       for (int i = 0; i < numberOfArticles; i++)
       {
           var articleCss =
               "a.img5txt5:nth-child(" +
               (i + 1)+")";
           var articlePhotoCss =
               "a.item:nth-child(" + (i+1)+") > span:nth-child(1) > img:nth-child(1)";

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
   #endregion

   
   #region textExtraction
   private NewsModel ExtractTextNoviniBg(IWebDriver driver, string searchParameters)
   {
       driver.Url = searchParameters;
       Thread.Sleep(3000);

       IWebElement articlePhoto = null;
       var articleContent = new List<string>();
       var articleTitle = driver.FindElement(By.CssSelector("body > div.main-wrapper > main > main > h1"));
       try
       {
           articlePhoto =
               driver.FindElement(By.CssSelector(
                   "body > div.main-wrapper > main > main > section > div > article > div.--image_holder > picture > img"));
       }
       catch (NoSuchElementException)
       { }

       var articleContainer = driver.FindElement(By.CssSelector("body > div.main-wrapper > main > main > section > div > article > section.openArticle__content.--spaced-bottom"));
       var paragraphs = articleContainer.FindElements(By.TagName("p"));
       foreach (var paragraph in paragraphs)
       {
           if (!paragraph.FindElements(By.TagName("a")).Any(a => a.GetAttribute("href").Contains("whatsapp.com")) &&
               !paragraph.GetAttribute("class").Contains("share") &&
               !paragraph.GetAttribute("class").Contains("related_news"))
           {
               articleContent.Add(paragraph.Text);
           }
           else
           {
               break;
           }
       }
       articleContent.Remove(articleContent.Last());
       string fullArticleText = string.Join(null, articleContent);

       var articleToAdd = new NewsModel()
       {
           Title = articleTitle.Text,
           Link = searchParameters,
           Photo = articlePhoto?.GetAttribute("src"),
           Text = fullArticleText
       };
       return articleToAdd;
   }
   
   private NewsModel TextExtractPikBg(IWebDriver driver, string searchParameters)
   {
       driver.Url = searchParameters;
       Thread.Sleep(1000);

       var articleTitle = driver.FindElement(By.CssSelector("body > main > div.container-wrap > div > div > div.col-xl-9.col-lg-8.news-view > div.top-news.left.w100 > h2"));
       var articlePhoto = driver.FindElement(By.CssSelector("body > main > div.container-wrap > div > div > div.col-xl-9.col-lg-8.news-view > div.top-news.left.w100 > picture > img"));
       var articleTextContainer = driver.FindElement(By.CssSelector("body > main > div.container-wrap > div > div > div.col-xl-9.col-lg-8.news-view > div.news-detail.left.w100"));
       var paragraphs = articleTextContainer.FindElements(By.TagName("p"));
       string articleText = "";
       var excludeKeywords = new List<string> { "WINBET","efbet", "Следвайте ПИК" };
            
       foreach (var paragraph in paragraphs)
       {
           bool containsExcludeKeyword = excludeKeywords.Any(keyword => paragraph.Text.Contains(keyword));

           if (!containsExcludeKeyword)
           {
               articleText += paragraph.Text; 
           }
       }                
            
       var articleToAdd = new NewsModel()
       {
           Title = articleTitle.Text,
           Link = searchParameters,
           Photo = articlePhoto.GetAttribute("src"),
           Text = articleText
       };
       return articleToAdd;
   }
   #endregion
}