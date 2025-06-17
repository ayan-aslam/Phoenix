import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';


const Dashboard = () => {
    return (
        <div>
            <SurveyList />
            <Link
                to="/surveys/new"
                className="btn-floating btn-large orange darken-4"
                style={{
                    position: "fixed",
                    bottom: "32px",
                    right: "32px",
                    zIndex: 1000
                }}
            >
                <i className="material-icons">add</i>
            </Link>
        </div>
    );
}

export default Dashboard;