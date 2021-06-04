import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notifiReducer from './reducers/notifiReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducre'
import App from './App'
import thunk from 'redux-thunk'
const reducer = combineReducers({blog :blogReducer,notif :notifiReducer,user:userReducer,users:usersReducer})
const store = createStore(reducer,
	composeWithDevTools(applyMiddleware(thunk))
	)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)