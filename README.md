# WatchFlick
www.whatflick.com
Site to find movies to watch currently on streaming services. Users can find currently trending movies as well as broswe similiar movies, recieve movie recomndations, read reviews and also find movies based on their favorite actors and directors.
![Image of HomePage](https://i.imgur.com/UjeQAQB.png)
![Image of MoveFeed](https://i.imgur.com/sLsaJOG.png)
![Image of MoveView](https://i.imgur.com/LwuDueR.png)
![Image of ActorView](https://i.imgur.com/wTSxGfy.png)
## Setup
### External APIs
This site uses 3 external APIs to send and recieve data. Documention can be found here:
1. [The Movie DataBase API](https://developers.themoviedb.org/3/getting-started/introduction)
2. [NewsAPI](https://newsapi.org/docs)
3. [Youtube API](https://developers.google.com/youtube/v3)
### API keys Setup
To setup your API keys locally the keys must be added to a file named APIKEY.js. This file is gitignored to keep your API keys private. You can see an example of how to add in your keys in the exampleApiKey.js file.
### Startup Instructions
1. npm install
2. npm run start 
  * runs nodemon server
3. npm run build
  * runs webpack
4. Go to http://localhost:5000/ in browser
