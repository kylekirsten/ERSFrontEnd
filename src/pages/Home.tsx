import React, {Component} from 'react';
import {Link } from "react-router-dom";

import './Home.css';

export default class Content extends Component {

    render() {  
        return (
            <>
                <h1 className ='page-title'>HOME PAGE</h1>
                <Link to="/users">USERS</Link>
            </>
        )
    
    }
}
