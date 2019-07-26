import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {UserTable} from '../components/ui/table/UserTable';
import './Users.css';
export default class Users extends Component {

    render() {  
        return (
            <>
                <h1 className ='page-title'>EDIT USERS PAGE</h1>
                <UserTable></UserTable>
            </>
        );
    
    }
}
