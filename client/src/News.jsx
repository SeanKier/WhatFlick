import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { newsApi_key } from './APIKEY';

const StoryItem = ({ story, index }) => {
  const {
    title, url, urlToImage, description,
  } = story;

  return (
    <li
      className="news-item"
      id={`news-item-${index}`}
    >
      <a
        className="link"
        style={{ display: 'table-cell' }}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="link">
          {title}
        </div>
      </a>
      { index === 0 && (
        <div>
          <img
            className="news-img"
            src={urlToImage}
            alt={`Backdrop for ${title}`}
          />
          <div className="news-description">
            {`${description.slice(0, 120)}...`}
          </div>
        </div>
      )}

    </li>
  );
};

StoryItem.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const News = () => {
  const [netflixNews, updateNeflixNews] = useState([]);

  const getNews = () => {
    fetch(`v2/everything?q=new netflix&sortBy=relevancy&apiKey=${newsApi_key}`)
      .then((response) => response.json())
      .then((response) => {
        const sorted = response.articles.sort((a, b) => a.publishedAt - b.publishedAt);
        updateNeflixNews(sorted.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="news">
      <h3 className="news-title">
        News
      </h3>
      <div className="news-container-container">
        <ul className="news-container">
          {netflixNews.map((story, i) => (
            <StoryItem key={i} index={i} story={story} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
