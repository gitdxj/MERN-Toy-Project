
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

# Redux
dispatch actions/getPost 
getPost call api to getPost and dispatch action
reducer behave according to dispatched action

combineReducers
```javascript
export default combineReducers({
    posts: posts,  // state.posts: action/posts.js
});
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

