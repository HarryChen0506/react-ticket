import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import initReactFastclick from 'react-fastclick';

//注入store
import { Provider } from 'react-redux';
import store from 'redux_module/store.js'

// initReactFastclick(); //fastclick在组件之前初始化

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider> 
), document.getElementById('root'));
registerServiceWorker();



