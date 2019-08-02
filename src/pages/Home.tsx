import React, {Component} from 'react';
import {Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import config from '../config.json';
import {connect} from 'react-redux';
import './Home.css';
import { IAuthState, IAppState } from '../reducers/index.js';
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
}
export class Home extends Component<IAuthProps,{}> {
    render() {  
        return (
            <>
                <Jumbotron><div className = 'login-container'>
            <h1 className = "page-title in-container">Welcome to the new ERS!</h1>
  <p>
    This Expense Reimbursement System (ERS) has been newly designed with *you* in mind.
    The application allows you to submit new reimbursement requests and track their status through an intuitive interface.
  </p><p>To begin, simply select the icon in the top-left corner of the screen to access the "Quick Menu". In the quick menu,
      you will be able to submit new reimbursements, as well as view your existing reimbursement requests by clicking the menu tabs.
      You can also click one of the buttons below to be routed to the desired page.
  </p>
  <p><i>On a mobile device?</i> This application is mobile-compliant, and all tasks are accessible via mobile device.</p>
  <p><i>Note: </i> If you have trouble interacting with the application, please send an email to: 
  <br/><a href= {'mailto:' +config.information.supportEmail}>{config.information.supportEmail}</a></p>
  <div className = "home-button-container">
      {this.props.auth.userProfile.role.roleId > 0 ? <>
    <Link to="/newreimbursement"><button className="home-button">Submit a new reimbursement</button></Link>
    <Link to="/myaccount"><button className="home-button">View account</button></Link> </>
      :     <Link to="/login"><button className="home-button">Login</button></Link> }
  </div></div>
</Jumbotron>
            </>
        )
    
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Home);
