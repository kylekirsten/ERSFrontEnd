import React, {Component} from 'react';
import {Route, Switch, Link } from "react-router-dom";
import Home from '../pages/Home';
import Users from '../pages/Users';
import './Content.css';
import PageNotFound from '../pages/PageNotFound';
import Reimbursements from '../pages/Reimbursements'
import Login from '../pages/Login'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NewReimbursement from '../pages/NewReimbursement';
export default class Content extends Component {

    render() {  
        return (
            <>
            <Navbar bg="dark" variant="dark" className="justify-content-end">
              <Link to = "/"><Navbar.Brand>MyCompany ERS</Navbar.Brand></Link>
                <Nav>
                    <Nav.Link>Home</Nav.Link>
                </Nav>
            </Navbar>
            <div className = 'content'>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/users" exact component={Users} />
                    <Route path="/reimbursements" exact component={Reimbursements} />
                    <Route path="/newreimbursement" exact component={NewReimbursement} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
            </>
        );
    
    }
}
