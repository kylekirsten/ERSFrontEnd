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
interface IState {
    isAuthenticated : boolean;
}
export default class Content extends Component {
    state : IState = {
        isAuthenticated: false,
    }
    componentDidMount(){
        setInterval(async () => {
            let token = window.localStorage.getItem('token') || window.sessionStorage.getItem('token');
            if(token){
                let isValid = await Session.isValidSession(token) ? true : false;
                this.setState({...this.state, isAuthenticated : isValid});
            } else {
                this.setState({...this.state, isAuthenticated : false});
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
            <Navbar bg="dark" variant="dark" className="justify-content-end">
              <Link to = "/"><Navbar.Brand>MyCompany ERS</Navbar.Brand></Link>
                <Nav>
                    <Nav.Link>My Account</Nav.Link>
                </Nav>
            </Navbar>
            <div className = 'content'>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    { this.isAuthenticated() ? <Route exact path="/users" component={Users} /> :
                    <Redirect to="/login" />}
                    { this.isAuthenticated() ? <Route exact path="/reimbursements" component={Reimbursements} /> :
                    <Redirect to="/login" />}
                    { this.isAuthenticated() ? <Route exact path="/newreimbursement" component={NewReimbursement} /> :
                    <Redirect to="/login" />}
                    <Route component={PageNotFound} />
                </Switch>
            </div>
            </>
        );
    
    }
}
