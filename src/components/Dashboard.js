import React, { Component } from 'react';
import { getClasses } from '../actions/index';
import { connect } from 'react-redux';


class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getFriends();
    }

    render(){
        return(
            <div className="dashboardContainer">
               <p>Logged in</p>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        classes: state.classes,
        fetchingClasses: state.fetchingClasses
    }
}

export default connect(mapStateToProps, { getClasses })(Dashboard);