//store 连接action reducer state

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers.js'

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.devToolsExtension;
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	devToolsExtension ? devToolsExtension():f=>f
))

export default store;
