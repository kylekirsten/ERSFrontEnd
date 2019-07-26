import React, {Component} from 'react';
import ReimbursementsTable from '../components/ui/table/ReimbursementsTable';
import './Users.css';
export default class Users extends Component {

    render() {  
        return (
            <>
                <h1 className ='page-title'>EDIT REIMBURSEMENTS PAGE</h1>
                <ReimbursementsTable></ReimbursementsTable>
            </>
        );
    
    }
}
