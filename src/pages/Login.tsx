import React, {Component, useState} from 'react';
import ReimbursementsTable from '../components/ui/table/ReimbursementsTable';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as APICall from '../utils/APICall';
interface IState {
    validated : boolean;
}
export default class Login extends Component {
    state : IState = {
        validated : false,
      };
      handleSubmit = (event : any) => {
        const form = event.currentTarget;
        const data = new FormData(event.target);
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else{
            this.checkCredentials(data);
        }
        this.setState({...this.state, validated: true});
      };
      checkCredentials = (data: FormData) => {
          let username : string = data.get('formUsername') as string;
          let password : string = data.get('formPassword') as string;
        const result = APICall.Login(username, password);
        if(result instanceof Error){
            console.log(result);
        }else{
            alert('correct!');
        }
      }
    render() {  
        return (
            <div className = "login-container">
                <h1 className ='page-title'>Login</h1>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required size="lg" type="text" />
                        <Form.Control.Feedback type="invalid">
                            Please enter a username
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required size="lg" type="password" />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check custom label="Remember Me" id="custom-rememberme-checkbox"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
            </div>
        );
    
    }
}