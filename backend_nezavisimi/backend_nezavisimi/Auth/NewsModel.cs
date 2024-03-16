namespace backend_nezavisimi.Auth;

public class NewsModel
{
    public string? Title { get; set; }
    public string? Link { get; set; }
    public string? Photo { get; set; }
    public string? Text { get; set; }
    public Dictionary<string,float>? Scores { get; set; }
    public string? Explanation { get; set; }
}