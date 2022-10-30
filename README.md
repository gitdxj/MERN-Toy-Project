
# Setup
client:
```
npx create-react-app ./
```
server:
```
npm install body-parser cors express mongoose nodemon
```
In package.json, set
```json
  "scripts": {
    "start": "nodemon index.js"
  },
```

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
1. dispatch actions/getPost   
2. getPost call api to getPost and dispatch action  
3. reducer behave according to dispatched action 

`combineReducers` to register the global state and actions
```js
export default combineReducers({
    posts: posts,  // state.posts: action/posts.js
});
```
`useSelector` to acess the global states
```js
const posts = useSelector((state) => state.posts);
```

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

