import React, {Component} from 'react';
import {UserTable} from '../components/ui/table/UserTable';
import './Users.css';
import { connect } from 'react-redux';
import { IAppState, IAuthState } from '../reducers';
import ErrorModal from '../components/ui/popup/ErrorModal';
export interface IAuthProps {
    auth: IAuthState
}
export interface IState {
    isAuthorized: boolean;
}
export class Users extends Component<IAuthProps,IState> {
    constructor(props : any){
        super(props);
        this.state = {
            isAuthorized: true,
        }
    }
    // componentWillReceiveProps() {
        // let userRole : number;
        // if(this.props.auth.userProfile){
            // userRole = this.props.auth.userProfile.role.roleId;
        // } else {
            // userRole = 0;
        // }
        // if(userRole >= 10){
            // this.setState({...this.state,isAuthorized: true});
    // }
// }
    render() {  

        return (
            <>
                <h1 className ='page-title'>USER MANAGEMENT</h1>
                {this.props.auth.userProfile.role.roleId >= 2 ? null : <ErrorModal updateCallback={() => {return}} 
            errorMessage = "You are unauthorized to view this resource" isCloseable= {false}/>}
                <UserTable role = {this.props.auth.userProfile.role.roleId}></UserTable>
            </>
        );
    
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Users);