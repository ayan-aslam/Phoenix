import React from 'react';


export default function SurveyField(props) {
  return (
    <div style={{width: '80%'}}>
      <label>{props.label}</label>
      <input {...props.input} style={{width: '100%', color: 'white', marginBottom: '1px'}}/>
      <div style={{color: 'red', fontSize: '12px', marginBottom: '10px', marginTop: '0px'}}>
      {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
}