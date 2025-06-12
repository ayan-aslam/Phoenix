import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'; // Assuming Payments is in the same directory


class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href="/auth/google" className="btn orange darken-4" style={{borderRadius: '50px'}}>Login with Google</a>;
            default:
                return [
                <li key='1'><Payments /></li>,
                <li key='2' className="btn orange darken-4" style={{borderRadius: '50px', alignSelf:'center',
                                                                    verticalAlign: 'middle',
                                                                    marginTop: '1.9vh',
                                                                    marginLeft: '1.5vw'
                }}> Credits: {this.props.auth.credits }</li>,
                <li key='3'><a href="/api/logout" className="btn orange darken-4" style={{borderRadius: '50px'}}>Logout</a></li>,

                
                ];
    }
  }

  render() {
    return (
      <nav style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}>
        <div className="nav-wrapper" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(5px)',
              boxShadow: 'none',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
        }}>
            {/* Group logo and Phoenix in a flex row with gap */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '2vw'
            }}>
                <a href='/' style={{ display: 'block' }}>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            verticalAlign: "middle",
                            alignSelf: "center",
                            display: "block"
                        }}
                    />
                </a>
                <Link
                    to={this.props.auth ? '/surveys' : '/'}
                    className="left brand-logo"
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginLeft: '60px',
                        alignSelf: "center",
                        verticalAlign: "middle",
                        display: 'block', // Make anchor block-level
                        lineHeight: "60px" // Vertically center text to image
                    }}
                    
                >
                    Phoenix
                </Link>
            </div>
            <ul className="right">
                {this.renderContent()}
            </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
