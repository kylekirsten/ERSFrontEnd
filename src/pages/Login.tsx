import React, {Component, useState} from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as APICall from '../utils/APICall';
import ErrorModal from '../components/ui/popup/ErrorModal';
import UserProfile from '../models/UserProfile';
interface IState {
    validated : boolean;
    errorModalPlaceholder : any;
    formFields : any;
}
export default class Login extends Component {
    state : IState = {
        validated : false,
        errorModalPlaceholder: null,
        formFields: {
            username: {
              value: ''
            },
            password: {
              value: ''
            }
        }
      };
      handleSubmit = (event : any) => {
        const form = event.currentTarget;
        const data = new FormData(event.target);
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else{
            this.checkCredentials(data);
        }
        this.setState({...this.state, validated: true});
      };
      showError = (message : any) => {
        this.setState({...this.state, errorModalPlaceholder: 
        <ErrorModal errorMessage = {message} updateCallback= {this.closeError}></ErrorModal>});
      }
      closeError = () => {
          this.setState({...this.state, errorModalPlaceholder: null, password: ''});
      }
      checkCredentials = async (data: FormData) => {
        const result = await APICall.Login(this.state.formFields.username.value, this.state.formFields.password.value);
        if(result instanceof Error){
            this.showError(result.message);
        }else{
            console.log(result);
            let userInfo = new UserProfile(result.token);
            window.localStorage.setItem('token', userInfo.getToken());
        }
      }
      changeHandler = (event: any) => {    
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formFields: {
                ...this.state.formFields,
                [name]: {
                ...this.state.formFields[name],
                value
                }
            }
        });
      }
    render() {  
        return (
            <div className = "login-container">
                <h1 className ='page-title'>Login</h1>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name = "username" required size="lg" type="text" 
                        value = {this.state.formFields.username.value} onChange = {this.changeHandler}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a username
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name = "password" required size="lg" type="password"
                        value = {this.state.formFields.password.value} onChange = {this.changeHandler} />
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
                {this.state.errorModalPlaceholder}
            </div>
        );
    
    }
}