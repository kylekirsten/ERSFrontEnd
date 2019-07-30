import React, {Component} from 'react';
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
