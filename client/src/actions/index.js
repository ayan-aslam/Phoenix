import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
import { reset } from 'redux-form';

export const fetchUser = () => 
    function(dispatch) {
    axios.get('/api/current_user')
    .then(res => dispatch(
        {type: FETCH_USER,
        payload: res.data
    }));

    }
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}    


export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
    dispatch(reset('surveyForm'));
}


export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
}