import blogReducer from './reducers/blogReducer'
import notifiReducer from './reducers/notifiReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducre'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({blog :blogReducer,notif :notifiReducer,user:userReducer,users:usersReducer})
export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
