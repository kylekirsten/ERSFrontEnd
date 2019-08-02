import React, {Component} from 'react';
import {Route, Switch, Link, Redirect } from "react-router-dom";
import Home from '../pages/Home';
import Users from '../pages/Users';
import './Content.css';
import Reimbursements from '../pages/Reimbursements'
import Login from '../pages/Login'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NewReimbursement from '../pages/NewReimbursement';
import * as Session from '../utils/Session';
import { IAppState, IAuthState } from '../reducers';
import { loginSuccessful, toggleAuthStatus, logout, beginLogin,
     loginFailed, authTimerTick, lostConnection} from '../actions/Authentication.action';
import { connect } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyReimbursements from '../pages/MyReimbursements';
import LoadingModal from './ui/popup/LoadingModal';
import ErrorModal from './ui/popup/ErrorModal';
import config from '../config.json';
import { MyAccount } from '../pages/MyAccount';
interface IState {
}
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    loginSuccessful: (dataObj : object) => void;
    toggleAuthStatus: () => void;
    logout: () => void;
    beginLogin: () => void;
    loginFailed: () => void;
    authTimerTick: () => void;
    lostConnection: () => void;
}
export class Content extends Component<IAuthProps,IState> {
    state : IState = {
    } 
    async componentDidMount(){
        this.props.beginLogin();
        let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
        if(token){
            let retrievedSession = await Session.retrieveSession(token as string);
            if(retrievedSession instanceof Error){
                if(retrievedSession.message === config.messages.badToken){
                    this.props.loginFailed();
                } else {
                this.props.lostConnection();
                }
            } else {
                this.props.loginSuccessful(retrievedSession);
            }
        } else {
            this.props.loginFailed();
        }
        setInterval(() => {this.props.authTimerTick()},120000);
    }
    logout() {
        Session.endSession();
        this.props.logout();
    }
    
    render() { 
        return (
            <>
            {this.props.auth.isFetching === true ? <LoadingModal message="Authenticating" updateCallback={()=>{}}/> : null}
            {this.props.auth.lostConnection === true ? 
            <ErrorModal errorMessage = "Could not verify session with server. Please refresh the page"
                        updateCallback = {() => {}} isCloseable = {false}></ErrorModal> : null }
            <Navbar bg="navblue" variant="dark" expand="md" className="justify-content-between">
            <Nav.Item style={{color:'black', zIndex: -5}}>PlaceHolder Text</Nav.Item>
                <Link to = "/home"><Navbar.Brand>MyCompany ERS</Navbar.Brand></Link>
                {this.props.auth.isVerified ?
                <Nav>
                    <NavDropdown fill title="My Account" id="account-nav-dropdown" className="account-nav-box">
                        <NavDropdown.Item>Hello<p>
                        {' ' + this.props.auth.userProfile.firstName + ' '} {this.props.auth.userProfile.lastName}</p>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item><Link to = {`/myaccount/${this.props.auth.userProfile.userId}`}>My Account Details</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to = {`/reimbursements/${this.props.auth.userProfile.userId}`}>My Reimbursements</Link></NavDropdown.Item>
                        <NavDropdown.Item><a href='#' onClick = {(e) => this.logout()}>Logout</a></NavDropdown.Item>
                    </NavDropdown>
                </Nav> : <Nav.Item><Link to ='/login'>Login</Link></Nav.Item>}
            </Navbar>
            <div className = 'content'>
                <Switch>
                <Route path = "/home" component={Home} />   
                <Route path="/login" exact component={Login} />
                    {this.props.auth.isVerified && !this.props.auth.isFetching ? 
                    <>
                    <Route exact path="/users" component={Users} /> 
                    <Route exact path="/myaccount/:userId" component={MyAccount} /> 
                    <Route exact path="/reimbursements" component={Reimbursements} /> 
                    <Route exact path="/newreimbursement" component={NewReimbursement} /> 
                     <Route exact path="/reimbursements/:userId" component = {MyReimbursements} />
                     </>
                : this.props.auth.isFetching === true ? null :<Redirect to = "/home"/> }
                  
                </Switch>
            </div>
            </>
        );
    
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful: loginSuccessful,
    toggleAuthStatus: toggleAuthStatus,
    beginLogin: beginLogin,
    loginFailed: loginFailed,
    logout: logout,
    authTimerTick: authTimerTick,
    lostConnection: lostConnection,
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
