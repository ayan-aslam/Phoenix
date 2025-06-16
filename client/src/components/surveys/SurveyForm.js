import React, { Component } from 'react';
import { reduxForm, Field, touch } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import FIELDS from './formFields';





class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    style={{width: '100%'}}
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }
    

    handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, handleSubmit } = this.props;
    const fieldNames = FIELDS.map(f => f.name);
    dispatch(touch('surveyForm', ...fieldNames));
    handleSubmit(this.props.onSurveySubmit)();
    }
    
    render() {
        return (
            <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-satrt",
    //minHeight: "100vh",
    //background: "#f5f5f5"
  }}
>
  <form
    onSubmit={this.handleSubmit}
    style={{
      border: "2px solid white",
      borderRadius: "16px",
      background: "transparent",
      padding: "32px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "box-shadow 0.3s, border-color 0.3s",
      cursor: "pointer",
      marginTop: '80px',
      width: "800px",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.25)";
      e.currentTarget.style.borderColor = "#ff6f00";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
      e.currentTarget.style.borderColor = "white";
    }}
    onMouseDown={e => {
      e.currentTarget.style.transform = "scale(0.98)";
    }}
    onMouseUp={e => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  > 
    <div style={{marginBottom: "24px",
                 color: "white",
    }}>
        <h2 style={{ fontWeight: "bold", margin: 0, marginBottom: "24px", textAlign: "center" }}>
        Create a Survey
        </h2>
    </div>    
    {this.renderFields()}
    <div style={{ marginTop: 16, textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "100px",
     }}>
        <button
        type="submit"
        className="btn orange darken-4"
        style={{
            width: "100px",
            marginTop: 16,
            borderRadius: "50px",
            transition: "box-shadow 0.2s, background 0.2s",
            cursor: "pointer"
        }}
        onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,111,0,0.3)";
            e.currentTarget.style.background = "#ff6f00";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "";
        }}
        onMouseDown={e => {
            e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={e => {
            e.currentTarget.style.transform = "scale(1)";
        }}
        >
        Next
        </button>
        <Link
        to="/surveys"
        type="submit"
        className="btn white darken-4"
        style={{
            width: "100px",
            marginTop: 16,
            borderRadius: "50px",
            transition: "box-shadow 0.2s, background 0.2s",
            cursor: "pointer",
            color: "black",
        }}
        onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,111,0,0.3)";
            e.currentTarget.style.background = "#ff6f00";
        }}
        onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "";
        }}
        onMouseDown={e => {
            e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={e => {
            e.currentTarget.style.transform = "scale(1)";
        }}
        >
        Cancel
        </Link>
    </div>    
  </form>
</div>
        )
    }
}

function validate(values) {
    const errors = {};


    errors.recipients = validateEmail(values.recipients  || '');

    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'Please enter a value';
            
        }
    });

   

    return errors;
}


export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false,

})(SurveyForm);