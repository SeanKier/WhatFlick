import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { newsApi_key } from './APIKEY';

const StoryItem = ({ story }) => {

  const { title, url, urlToImage, description } = story;

  return (
    <li>
      <a
        style={{display: "table-cell"}}
        href={url}
        target="_blank"
      >
        <h1>
          {title}
        </h1>
      </a>
      <img
        className="other-rounded"
        src={urlToImage}
        alt={`Backdrop for ${title}`}
      />
      <p>
        {description}
      </p>
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
          <ul>
            {netflixNews.map((story, i) => (
              <StoryItem key={i} story={story} />
            ))}
          </ul>
        </div>

    </div>
  );
}



export default News;