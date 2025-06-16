import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


const Surveyreview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name} style={{ marginBottom: '10px' }}>
                <label style={{ color: 'gray', fontSize:'15px',
                                borderBottom: '1px dashed lightgray', paddingBottom: '5px',
                                margin: "10px 0"
                 }}>{field.label}</label>
                <div style={{   color: 'white', marginTop: '10px',
                                fontSize: '18px', padding: '10px',
                                fontStyle: 'bold'
                                
                                
                 }}>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });


    return (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <h2 style={{ color: 'white' }}>Survey Review</h2>
            <p style={{ color: 'white' }}>Please review your survey details before submission.</p>
            
            <div style={{border: '2px dashed lightgray', padding: '20px', borderRadius: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', 
                        margin: '20px auto', width: '60%',
            }}>
                {reviewFields}
            </div> 
            <div>
                <button
                onClick = {onCancel}
                style={{ padding: '10px 20px', borderRadius: '5px',
                        color: 'black', border: 'none',
                        margin: '0px 20px'
                        }}>
                    Go Back
                </button>
                <button
                onClick = { () => submitSurvey(formValues, history)}
                style={{ padding: '10px 20px', borderRadius: '5px',
                        color: 'white', border: 'none',
                        margin: '0px 20px',
                        }} className="orange darken-4">
                    Send Survey
                    
                </button>
            </div>    
            
        </div>
    )
}


function mapStateToProps(state) {
    return {
        // You can map state to props if needed
        formValues: state.form.surveyForm ? state.form.surveyForm.values : {}
    };
}



export default connect(mapStateToProps, actions)(withRouter(Surveyreview));