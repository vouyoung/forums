This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs both the app and server
[http://localhost:3000](http://localhost:3000) App
[http://localhost:3001](http://localhost:3001) Server

### `yarn start:web`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start:server`

Runs the server
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### deviations

Instead of an Editor panel, I've create a modal that comes up [+] button is clicked

API Endpoints

GET endpoint for querying channels
■ GET http://<backend>/channels

○ GET endpoint for querying channel’s messages
■ GET http://<backend>/messages?channel_id=<channel_id>

○ PUT endpoint for submitting new messages to a channel
■ PUT http://<backend>/messages

○ DELETE endpoint for deleting messages
■ DELETE http://<backend>/messages/:id
