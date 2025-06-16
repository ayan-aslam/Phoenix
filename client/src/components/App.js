import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import  Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landingtext from './Landingtext';
// import '../App.css'
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// const Header = () => <h2>Header</h2>;
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;


class App extends Component {
    componentDidMount()
    {
        this.props.fetchUser();
    } 
    render() {
        return (
            <div  style={{
                                              //backgroundImage: "url('/pexels-adrien-olichon-1257089-2387793.jpg')",
                                              backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              height: "100vh",
                                              width: "100%",
                                              position: "absolute",
                                              top: 0,   
                                              left: 0
                                            }}>
                <BrowserRouter>
                    <div>
                        <Header /> 
                        <div className='container'></div>
                        <Route exact path="/" component={() => (
                                                                    <>
                                                                    <Landing />
                                                                    <Landingtext />
                                                                    </>
                                                                )} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path='/surveys/new' component={SurveyNew} />

                    </div>
                </BrowserRouter>
            </div>
        )}
}

export default connect(null, actions)(App);