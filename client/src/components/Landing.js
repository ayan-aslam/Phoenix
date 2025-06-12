import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href="/auth/google" className="btn orange darken-4" style={{borderRadius: '50px'}}>Login with Google</a>;
            default:
                return <a href="/surveys" className="btn orange darken-4" style={{borderRadius: '50px'}}>Go to Surveys</a>;
        }
    }

    render() {
        return (
            <div>
                {/* Useless background container */}
                <div
                    className="container"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: -1,
                        pointerEvents: "none"
                    }}
                />
                {/* Centered circular logo */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginTop: "2vh",
                        width: "100vw"
                    }}
                >
                    <div
                        style={{
                            width: "50vh",
                            height: "50vh",
                            borderRadius: "50%",
                            overflow: "hidden",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#fff",
                            // backgroundColor: 'transparent',
                            
                        }}
                    >
                        <img
                            src="/logo.png" // <-- replace with your image path
                            alt="Logo"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth: auth };
}

export default connect(mapStateToProps)(Landing);