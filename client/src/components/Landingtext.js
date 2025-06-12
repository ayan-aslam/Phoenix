import React from 'react';
import { connect } from 'react-redux';

const Landingtext = ({ auth }) => {
    return (
        <div className='white-text' style={{ textAlign: 'center' }}>
            <h1>Welcome to Phoenix</h1>
            <h5>Collect feedback from your users with ease.</h5>
            <div>
                {auth ? (
                    <a
                        href="/surveys"
                        className="btn orange darken-4"
                        style={{
                            marginTop: '5vh',
                            borderRadius: '20px'
                        }}
                    >
                        Go To Surveys
                    </a>
                ) : (
                    <a
                        href="/auth/google"
                        className="btn orange darken-4"
                        style={{
                            marginTop: '5vh',
                            borderRadius: '20px'
                        }}
                    >
                        Login with Google
                    </a>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Landingtext);