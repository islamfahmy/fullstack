import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecReducer from './reducers/anecdoteReducer'
import notifReducer from'./reducers/notificationReducer'
const reducer = combineReducers({
  anecdote:anecReducer,
  notification: notifReducer
})
const store = createStore(reducer)
//store.subscribe(() => console.log(store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)