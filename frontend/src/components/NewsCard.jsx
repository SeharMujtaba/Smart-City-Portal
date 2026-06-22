function NewsCard({ article }) {

  const openArticle = (url) => {
    if (!url || !url.startsWith("http")) return;

    // safer opening
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="news-card">

      <img
        src={article.image || "/news-placeholder.jpg"}
        alt={article.title}
      />

      <div className="news-content">

        <span className="category">
          {article.source || "News"}
        </span>

        <h2>{article.title}</h2>

        <p>{article.description}</p>

        <div className="news-footer">

          <span className="date">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>

          <button
            className="read-more"
            onClick={() => openArticle(article.url)}
            disabled={!article.url}
          >
            Read More →
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewsCard;