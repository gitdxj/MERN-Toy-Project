
# MERN(MongoDB, Express, React, Node) Full Stack Project
project following tutorial [JavaScript Mastery](https://www.youtube.com/watch?v=VsUzmlZfYNg) and his repo can be found [here](https://github.com/adrianhajdin/project_mern_memories)

Implemented :
* Sign up & Sign in
* Google Account Sigin
* Posts: Publish, Delete, Edit
* Post Detail Page
* Like and Comment  

could be implemented in the future:
* Profile page
* User personal page

# To Run this project
### Package installation
clone the repo and  run 
```npm install```
in both `client` and `server`.

### MongoDB connection URL
create a `.env` in `server` and set
* `PORT`: the port for backend
* `CONNECTION_URL`: mongodb connection url

### Google OAuth Client ID
replace `clientId` in `client/components/Auth/Auth.js` and `CLIENT_ID` in `server/middleware/auth.js` with your own Google

# Setup
React frontend:
```
npx create-react-app ./
```
Express backend:
```
npm install body-parser cors express mongoose nodemon
```
In package.json, set
```json
  "scripts": {
    "start": "nodemon index.js"
  },
```
 OAuth Client ID 

# MongoDB
go to [`cloud.mongodb.com`](https://cloud.mongodb.com) and create a new database.  
Put your `CONNECTION_URL` in `/server/.env` . 
```js
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
```

# Redux
Take getPost for example,
1. dispatch actions/posts.js:getPost   
2. getPost call api to get a post from backend and dispatch action  
3. reducers behave according to dispatched action and change the global states 

`combineReducers` to register the global state and actions
```js
// reduces/index.js
export default combineReducers({
    posts: posts,  // state.posts: action/posts.js
});
```
```js
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
    <Provider store={store}>
        <App/> 
    </Provider>
);
```
`useSelector` to acess the global states
```js
const posts = useSelector((state) => state.posts);
```

# Authentication
## Google Authentication
### Get OAuth CLIENT_ID
go to [`console.cloud.google.com`](https://console.cloud.google.com) to create new project and create OAuth Client Id in Credentials

### Frontend Google Account Login
```js
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  //  google login button  
  <GoogleLogin
    clientId={clientId}
    buttonText="Sign in with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
/>

```
### Backend Token verify

```js
import { OAuth2Client } from 'google-auth-library';

// in middleware
try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    req.userId = payload['sub'];
```

## Sign up & Sign in
1. frontend: Get account info and POST
2. backend: check database, return data
```js
{
  result: , // user infomation, email, name, hashedPassword
  token: , // jwt sign
}
```
3. frontend: receive response and put it in `localStorage`

## middleware
verify toekn in the request

# backend
## routes
api address
## controllers
handle request, interact with database and send response 
## models
data schema

# frontend
## api 
compose request using axios
## actions
call api, get returned response and dispatch action
## reducers
handle dispated actions and maintain global states
## components
react components