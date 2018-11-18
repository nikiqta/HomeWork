import React from 'react';
import './Preloader.css';
import {connect} from 'react-redux';


const Preloader = ({ loading }) => {
    if (!loading) return null;
    return (
        <div className="preloader">
            {loading && <p>Loading &hellip;</p>}
        </div>
    );
};

export default connect((state) => ({
    loading: state.statusAjax > 0
}))(Preloader);
