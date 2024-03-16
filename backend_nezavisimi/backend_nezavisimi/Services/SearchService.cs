using System.Diagnostics;
using System.Text.RegularExpressions;
using backend_nezavisimi.Auth;
using backend_nezavisimi.Services.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace backend_nezavisimi.Services;

public class SearchService : ISearchService
{
    public List<NewsModel> SearchArticles(string searchParameters, int? selectedNumberOfArticles, List<string>? selectedMedia)
    {
        FirefoxOptions options = new FirefoxOptions();
        options.SetPreference("javascript.enabled", false);
        IWebDriver driver = new FirefoxDriver(options);
        
        var newsModel = new List<NewsModel>();

        bool isUrl = IsUrl(searchParameters);
        bool isMediaSelected = selectedMedia != null && selectedMedia.Count > 0;

        if (isMediaSelected)
        {
            bool isNoviniBgIncluded = selectedMedia.Contains("novini.bg");
            bool isPikBgIncluded = selectedMedia.Contains("pik.bg");
            bool isFrogNewsIncluded = selectedMedia.Contains("frognews.bg");
            
            if (isNoviniBgIncluded)
            {
                var noviniBg = SearchNoviniBg(driver,selectedNumberOfArticles ?? 2,searchParameters);
                foreach (var news in noviniBg)
                {
                    if (news.Link != null)
                    {
                        var articleToAdd = ExtractTextNoviniBg(driver, news.Link);
                        articleToAdd.Source = "Novini.bg";
                        newsModel.Add(articleToAdd);
                    }
                }
            }
            
            if (isPikBgIncluded)
            {
                var pikBg = SearchPikBg(driver,selectedNumberOfArticles ?? 2,searchParameters);
                foreach (var news in pikBg)
                {
                    if (news.Link != null)
                    {
                        var articleToAdd = ExtractTextPikBg(driver, news.Link);
                        articleToAdd.Source = "Pik.bg";
                        newsModel.Add(articleToAdd);
                    }
                }
            }
            
            if (isFrogNewsIncluded)
            {
                var frogNews = SearchFrogNews(driver,selectedNumberOfArticles ?? 2,searchParameters);
                foreach (var news in frogNews)
                {
                    if (news.Link != null)
                    {
                        var articleToAdd = ExtractTextFrogNews(driver, news.Link);
                        articleToAdd.Source = "Frognews.bg";
                        newsModel.Add(articleToAdd);
                    }
                }
            }
            foreach (var news in newsModel)
            {
                string tempFilePath = Path.GetTempFileName();
                File.WriteAllText(tempFilePath, news.Text);

                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = "python3",
                        Arguments = $"../../model/explain.py \"{tempFilePath}\"", 
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = true
                    }
                };
                process.Start();

                string result = process.StandardOutput.ReadToEnd();

                try
                {
                    var evaluationResult = JsonConvert.DeserializeObject<JObject>(result);
                    news.Scores = evaluationResult["scores"].ToObject<Dictionary<string,float>>();
                    news.Explanation = evaluationResult["explanation"].ToString();
                }
                catch (JsonReaderException e)
                {
                
                }
                process.WaitForExit();


                File.Delete(tempFilePath);
            }

            return newsModel;
        }

        if (isUrl)
        {
            bool isFromNoviniBg = IsUrlFromSpecificDomain(searchParameters, "novini.bg");
            bool isFromPikBg = IsUrlFromSpecificDomain(searchParameters, "pik.bg");
            bool isFromFrogNews = IsUrlFromSpecificDomain(searchParameters, "frognews.bg");

            if (isFromNoviniBg)
            { 
                var newsModelUrl = SearchNoviniBg(driver, 1, searchParameters, true);
                newsModel.First().Source = "Novini.bg";
                newsModel.Add(newsModelUrl.First());
            }
            else if (isFromPikBg)
            {
                var newsModelUrl = SearchPikBg(driver, 1, searchParameters,true);
                newsModel.First().Source = "Pik.bg";
                newsModel.Add(newsModelUrl.First());
            }
            else if (isFromFrogNews)
            {
                var newsModelUrl = SearchFrogNews(driver, 1, searchParameters,true);
                newsModel.First().Source = "Frognews.bg";
                newsModel.Add(newsModelUrl.First());
            }
        }
        else
        {
            var noviniBg = SearchNoviniBg(driver,selectedNumberOfArticles ?? 2,searchParameters);
             foreach (var news in noviniBg)
             {
                 if (news.Link != null)
                 {
                     var articleToAdd = ExtractTextNoviniBg(driver, news.Link);
                     articleToAdd.Source = "Novini.bg";
                     newsModel.Add(articleToAdd);
                 }
             }
            var pikBg = SearchPikBg(driver,selectedNumberOfArticles ?? 2,searchParameters);
             foreach (var news in pikBg)
             {
                 if (news.Link != null)
                 {
                     var articleToAdd = ExtractTextPikBg(driver, news.Link);
                     articleToAdd.Source = "Pik.bg";
                     newsModel.Add(articleToAdd);
                 }
             }
            var frogNews = SearchFrogNews(driver, selectedNumberOfArticles ?? 2, searchParameters);
            foreach (var news in frogNews)
            {
                if (news.Link != null)
                {
                    var articleToAdd = ExtractTextFrogNews(driver, news.Link);
                    articleToAdd.Source = "Frognews.bg";
                    newsModel.Add(articleToAdd);
                }
            }
        }
        
        foreach (var news in newsModel)
        {
            string tempFilePath = Path.GetTempFileName();
            File.WriteAllText(tempFilePath, news.Text);

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "python3",
                    Arguments = $"../../model/explain.py \"{tempFilePath}\"", 
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            };
            process.Start();

            string result = process.StandardOutput.ReadToEnd();
            try
            {
                var evaluationResult = JsonConvert.DeserializeObject<JObject>(result);
                news.Scores = evaluationResult["scores"].ToObject<Dictionary<string,float>>();
                news.Explanation = evaluationResult["explanation"].ToString();
            }
            catch (JsonReaderException e)
            {
                
            }
            process.WaitForExit();


            File.Delete(tempFilePath);
        }

        
        return newsModel;
    }
    
    public List<NewsModel> ModelByOwnText(string ownText)
    {
        string tempFilePath = Path.GetTempFileName();
        File.WriteAllText(tempFilePath, ownText);

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "python3",
                Arguments = $"../../model/explain.py \"{tempFilePath}\"", 
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
            }
        };
        process.Start();

        string result = process.StandardOutput.ReadToEnd();

        try
        {
            var evaluationResult = JsonConvert.DeserializeObject<JObject>(result);
            var newsModel = new NewsModel()
            {
                Text = ownText,
                Scores = evaluationResult["scores"].ToObject<Dictionary<string, float>>(),
                Explanation = evaluationResult["explanation"].ToString()
            };
            return new List<NewsModel> {newsModel};
        }
        catch (JsonReaderException e)
        {
            return null;
        }
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
            var articleToAdd = ExtractTextPikBg(driver, searchParameters);
            newsModelUrl.Add(articleToAdd);
            return newsModelUrl;
        }

        driver.Url = "https://pik.bg/" + searchParameters.Replace(" ", "-") + "-search.html";
        var newsModels = new List<NewsModel>(); 
        Thread.Sleep(1000);

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
       if (isUrl)
       {
           var newsModelUrl = new List<NewsModel>();
           var articleToAdd = ExtractTextFrogNews(driver, searchParameters);
           newsModelUrl.Add(articleToAdd);
           return newsModelUrl;
       }
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
   
   private NewsModel ExtractTextPikBg(IWebDriver driver, string searchParameters)
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


   private NewsModel ExtractTextFrogNews(IWebDriver driver, string searchParameters)
   {
       driver.Url = searchParameters;
       Thread.Sleep(1000);  // Consider using WebDriverWait for more reliable synchronization

       var articleTitle = driver.FindElement(By.CssSelector("body > div.content > div > div > article > div.article-image-title > h1")).Text;

       var articlePhoto = driver.FindElement(By.CssSelector("body > div.content > div > div > article > div.article-image-share > div.article-image-blk > img")).GetAttribute("src");

       var articleContainer = driver.FindElement(By.CssSelector("body > div.content > div > div > article > div.article-full-text-area > div.article-full-text"));
       var paragraphs = articleContainer.FindElements(By.TagName("p"));

       var articleContent = new List<string>();
       foreach (var paragraph in paragraphs)
       {
           articleContent.Add(paragraph.Text);
       }

       string fullArticleText = string.Join("\n", articleContent);

       var articleToAdd = new NewsModel()
       {
           Title = articleTitle,
           Link = searchParameters,
           Photo = articlePhoto,
           Text = fullArticleText
       };

       return articleToAdd;
   }
   #endregion
}