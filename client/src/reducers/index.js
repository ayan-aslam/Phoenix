import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';



export default combineReducers(
    {
        auth: authReducer,
        form: reduxForm, // This is for handling forms in Redux
        surveys: surveysReducer
    }
);