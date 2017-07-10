import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authentication from './middleware/arcgis-authentication';
import sceneview from './middleware/arcgis-sceneview';

import App from './components/App';
import reducer from './reducer/app';
import { getIdentity } from './reducer/user/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, authentication, sceneview)));

store.dispatch(getIdentity());

let node = document.getElementById('app-container');

ReactDOM.render(
  <div>
  	<Provider store={store}>
  		<App />
    </Provider>
  </div>,
  node
);

calcite.init();
