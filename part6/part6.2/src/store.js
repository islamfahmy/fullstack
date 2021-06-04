import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import App from './App'

const store = createStore(reducer)
 const ret =()=>
 {
 	return(
             <Provider store={store}>
    		<App />
			  </Provider>
			)
 }
 export default store