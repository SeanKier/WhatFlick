import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const news = () => {

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    fetch('v2/top-headlines?country=us&apiKey=b3b7eadbaf734646a234c44b765d31f3')
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('news>>>>>>>>>', response);
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
    </div>
  );
}



export default news;