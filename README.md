# Social Wordle Node Server App
This repo contains the Node server app for the Social Wordle site.

### Installation / Usage
To run the server, use the following steps:

1. Run `npm install` from the command line
2. Create a `.env` file with the following environment variables:
```
  NODE_ENV=development
  NETLIFY_URL=http://localhost:5173
  NODE_SERVER_DOMAIN=http://localhost:4000
  SESSION_SECRET=super secret session phrase
```
3. Make sure MongoDB is running locally
4. Import the data from the `StarterData` directory into their respective MongoDB collections. The database should be named `social-wordle-app`, and the five collections are `users`, `tournaments`, `wordleGuess`, `wordles`, and `comments`.
6. Run `npm run dev` to start the server in development mode (requires `nodemon` to be installed)

### Entity Relationships
The entity relationship diagram can be found in the [Wiki pages](https://github.com/jakefriedman519/social-wordle-node-server-app/wiki/Entity-Relationship-Diagram).
