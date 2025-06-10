import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href="/auth/google" className="btn gray lighten-1">Login with Google</a>;
            default:
                return <a href="/api/logout" className="btn red lighten-1">Logout</a>;
        }
    }

    render() {
        return (
            <nav
                className="transparent white-text"
                style={{
                    height: "70px",
                    background: "rgba(255, 255, 255, 0.4)",
                    // boxShadow: "0 4px 12px rgba(0,0,0,0)",
                    // border: "2px solid #fff",
                    
                    display: "flex",
                    alignItems: "center",
                    width: "100%",         // Use 100% instead of 100vw
                    left: 0,
                    right: 0,
                    top: 0,
                    position: "relative",  // or "fixed" if you want it always visible
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box" // Ensure padding/border don't cause overflow
                }}
            >
                <div className="nav-wrapper" style={{ width: "100%",
                                                      boxShadow: 'none',
                                                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                      borderRadius: '35px',
                                                      display: 'flex',
                                                      justifyContent: 'space-between'}}>
                    <img src='/logo.png'></img>                                    
                    <a className="left brand-logo" style={{ fontSize: "2.5rem", paddingLeft: "20px" }}>
                        Phoenix
                    </a>
                    <ul className="right" style={{ marginRight: "20px",

                     }}>
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth: auth };
}

export default connect(mapStateToProps)(Header);