import React, {Component} from 'react';
import {Route, Switch, Link, Redirect } from "react-router-dom";
import Home from '../pages/Home';
import Users from '../pages/Users';
import './Content.css';
import PageNotFound from '../pages/PageNotFound';
import Reimbursements from '../pages/Reimbursements'
import Login from '../pages/Login'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NewReimbursement from '../pages/NewReimbursement';
import * as Session from '../utils/Session';
import { IAppState, IAuthState } from '../reducers';
import { loginSuccessful, toggleAuthStatus } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyReimbursements from '../pages/MyReimbursements';
interface IState {
    isAuthenticated : boolean;
}
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    loginSuccessful: (dataObj : object) => void;
    toggleAuthStatus: () => void;
}
export class Content extends Component<IAuthProps,IState> {
    state : IState = {
        isAuthenticated: false,
    } 
    async componentDidMount(){
        let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
        if(token){
            this.props.loginSuccessful(await Session.retrieveSession(token as string));
            console.log(this.props.auth.userProfile.lastName);
        }
        setInterval(async () => {
            if(token){
                let isValid = await Session.isValidSession(token);
                if(!isValid){
                    this.props.toggleAuthStatus();
                }else{
                    this.props.loginSuccessful(await Session.retrieveSession(token as string))
                }
            } else {
                    this.props.toggleAuthStatus();
            }
        },60000);
    }
    async isAuthenticated() : Promise<boolean> {
        let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
        if(token){
            let isValid = await Session.isValidSession(token) ? true : false;
            return isValid;

        } else {
            return false;
        }
    }
    
    render() { 
        return (
            <>
            <Navbar bg="navblue" variant="dark" expand="md" className="justify-content-between">
            <Nav.Item style={{color:'black', zIndex: -5}}>PlaceHolder Text</Nav.Item>
                <Link to = "/"><Navbar.Brand>MyCompany ERS</Navbar.Brand></Link>
                <Nav>
                    <NavDropdown fill title="My Account" id="account-nav-dropdown" className="account-nav-box">
                        <NavDropdown.Item>Hello
                        {' ' + this.props.auth.userProfile.firstName + ' '} {this.props.auth.userProfile.lastName}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item><Link to = "/myaccount">My Account Details</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to = {`/reimbursements/${this.props.auth.userProfile.userId}`}>My Reimbursements</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to = "/logout">Logout</Link></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <div className = 'content'>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    { this.props.auth.isVerified ? <Route exact path="/users" component={Users} /> :
                    <Redirect to="/login" />}
                    { this.props.auth.isVerified ? <Route exact path="/reimbursements" component={Reimbursements} /> :
                    <Redirect to="/login" />}
                    { this.props.auth.isVerified ? <Route exact path="/newreimbursement" component={NewReimbursement} /> :
                    <Redirect to="/login" />}
                     { this.props.auth.isVerified ? <Route exact path="/reimbursements/:userId"   
                     component = {MyReimbursements} /> :
                    <Redirect to="/login" />}
                    <Route component={PageNotFound} />
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
    toggleAuthStatus: toggleAuthStatus
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
