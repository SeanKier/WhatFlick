import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StoryItem = ({ story }) => {

  const { title, urlToImage, description } = story;

  return (
    <li>


          <Link
        to='/news'
      >
        {title}
      </Link>
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
    fetch('v2/everything?q=new netflix&sortBy=relevancy&apiKey=b3b7eadbaf734646a234c44b765d31f3')
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