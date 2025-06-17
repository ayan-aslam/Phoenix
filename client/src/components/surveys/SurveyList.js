import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';



class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }    


    renderSurveys(){ 
        return (
            
            
            
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "32px",
                    padding: "32px",
                    margin: "32px auto 0 auto",
                    width: "100%",
                    maxWidth: "1400px",
                    justifyItems: "center",
                    color: "white",
                }}
            >   
                
                {this.props.surveys.map(survey => (
                    <div
                        className="survey-card"
                        key={survey._id}
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(8px)",
                            minWidth: "0",
                            width: "100%",
                            maxWidth: "300px",
                            height: "300px",
                            border: "3px solid white",
                            borderRadius: "50px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxSizing: "border-box",
                            margin: "0 auto",
                            transition: "transform 0.2s cubic-bezier(.4,2,.6,1), background 0.2s, color 0.2s",
                            cursor: "pointer",
                            overflow: "hidden",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "scale(1.04)";
                            e.currentTarget.style.background = "#fff";
                            e.currentTarget.style.color = "#111";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.color = "#fff";
                        }}
                    >
                        <div className="card-content" style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            flex: 1,
                            padding: "16px"
                        }}>
                            <span
                              className="card-title"
                              style={{
                                fontWeight: "bold",
                                display: "block",
                                marginBottom: "8px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                                wordBreak: "break-word",
                                fontSize: "1.2em"
                              }}
                            >
                              {survey.title}
                            </span>
                            <p style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                marginBottom: "16px",
                                fontSize: "1em"
                            }}>
                                {survey.body}
                            </p>
                            <p className="right" style={{ fontSize: "0.9em", color: "#bbb" }}>
                                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="card-action" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 24px 20px 24px",
                            //fontWeight: "bold",
                            fontSize: "1em",
                            //borderTop: "1px solid rgba(255,255,255,0.2)",
                            //marginTop: "-30px",

                        }}>
                            <span style={{ color: "#ff6f00" }}>Yes: {survey.yes}</span>
                            <span style={{ color: "#000" }}>No: {survey.no}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }    


    render() {
        return (
            <div
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    background: "transparent",
                    boxSizing: "border-box",
                }}
            >
                {this.renderSurveys()}
            </div>
        );
    }
}




function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);