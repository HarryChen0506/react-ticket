import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//注入store
import { Provider } from 'react-redux';
import store from 'redux_module/store.js'

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider> 
), document.getElementById('root'));
registerServiceWorker();



