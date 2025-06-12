import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
    debugger;

        return (
            <StripeCheckout
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                //className="btn orange darken-4"
                label="Buy Credits"
                style={{ borderRadius: '50px'}}
                description='$5 for 5 Credits'
                name='Phoenix'
            >
                <button
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '10px 18px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: '5px'
                    }}
                >
                    Buy Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);