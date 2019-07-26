import React, {Component, useState} from 'react';
import ReimbursementsTable from '../components/ui/table/ReimbursementsTable';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
interface IState {
    validated : boolean;
}
export default class Login extends Component {
    state : IState = {
        validated : false,
      };
      handleSubmit = (event : any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        this.setState({...this.state, validated: true});
      };
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
                    <Form.Group controlId="formBasicChecbox">
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