import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import reduxThunk from 'redux-thunk';
import axios from 'axios';


window.axios = axios; // Make axios globally available

const store = createStore(reducers,  {}, applyMiddleware(reduxThunk));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));


//console.log('Stripe Key is:', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is:', process.env.NODE_ENV);



