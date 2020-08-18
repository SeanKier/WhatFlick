import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { newsApi_key } from './APIKEY';

const StoryItem = ({ story, index }) => {

  const { title, url, urlToImage, description } = story;

  return (
    <li
      className="news-item"
      id={`news-item-${index}`}
    >
      <a
        style={{display: "table-cell"}}
        href={url}
        target="_blank"
      >
        <p>
          {title}
        </p>
      </a>
      { index === 0 && (
        <div>
          <img
            className="news-img"
            src={urlToImage}
            alt={`Backdrop for ${title}`}
          />
          <p>
            {description}
          </p>
        </div>
      )}

    </li>
  );
};

StoryItem.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

const News = () => {
  const [netflixNews, updateNeflixNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    fetch(`v2/everything?q=new netflix&sortBy=relevancy&apiKey=${newsApi_key}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        const sorted = response.articles.sort((a, b) => {
          b.publishedAt - a.publishedAt;
        })
        updateNeflixNews(sorted.slice(0, 4));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="news">
      <h3>
        News
      </h3>
        <div>
          <ul className="news-container">
            {netflixNews.map((story, i) => (
              <StoryItem key={i} index={i} story={story} />
            ))}
          </ul>
        </div>

    </div>
  );
}



export default News;