import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            Dashboard
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