import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';
import { IAuthState, IAppState } from '../reducers/index.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toggleAuthStatus, loginSuccessful } from '../actions/Authentication.action';
import * as APICall from '../utils/APICall';
import Form from 'react-bootstrap/Form';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as Format from '../utils/Format';
export interface IAuthProps {
    //data from state store
    auth: IAuthState;
}
export interface IState {
    auth : any,
    reimbursements: any[],
}
type IProps = RouteComponentProps<RouteParams> & IAuthProps;

type RouteParams = {
    userId: string; // must be type string since route params
}
export class MyAccount extends React.Component<IProps,IState> {
    constructor(props : any){
        super(props);
        this.state = {
            auth: {
                userProfile: {
                    userId: 0,
                    userName: "Unknown",
                    firstName: "Unknown",
                    lastName: "Unknown",
                    email: "Unknown@unknown.com",
                    role: {roleId: 0, role:"unknown"}
                }
            },
            reimbursements: []
        }
    }
    componentDidUpdate(oldProps: { auth: any; }) {
        const newProps = this.props;
        if(oldProps.auth !== newProps.auth) {
            console.log('update');  
            this.setState({auth : newProps.auth})
            this.getInfo();
        }
      }
      
      async getInfo() {
        console.log(this.props.auth);
        const loadedData = await APICall.GET('/users/' +  + this.props.match.params.userId);
        if(loadedData instanceof Error){
        }else{
          const newArr : any = loadedData;
          this.setState({auth: {userProfile : newArr}});
        }
        const loadedData2 = await APICall.GET('/reimbursements/author/userId/' + this.props.match.params.userId);
        console.log(loadedData2);
        this.setState({reimbursements: loadedData2})
      }
      componentDidMount(){
          this.getInfo();
      }
    render() {  
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.trzcacak.rs/myfile/detail/32-327033_generic-profile-picture-png.png" />
            <Card.Body>
            <Card.Title>{this.state.auth.userProfile.firstName + ' ' + this.state.auth.userProfile.lastName}</Card.Title>
      <p><Form.Label>Username: </Form.Label> {this.state.auth.userProfile.userName}</p>
      <p><Form.Label>Email: </Form.Label> {this.state.auth.userProfile.email}</p>
      <p><Form.Label>Role: </Form.Label> {this.state.auth.userProfile.role.role}</p>
      <p><Form.Label><strong>Reimbursements:</strong></Form.Label></p>
      <p>Accepted: {this.state.reimbursements.filter((element)=>{
          if(element.status.statusId === 2){return true} return false
      }).length}</p>
      <p>Denied: {this.state.reimbursements.filter((element)=>{
          if(element.status.statusId === 3){return true} return false
      }).length}</p>
      <p>Pending: {this.state.reimbursements.filter((element)=>{
          if(element.status.statusId === 1){return true} return false
      }).length}</p>
    

    <Link to = {"/reimbursements/" + this.state.auth.userProfile.userId}><Button variant="primary">View Reimbursements</Button></Link>
  </Card.Body>
</Card>
        
        )
    
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
export default connect(mapStateToProps)(MyAccount);
