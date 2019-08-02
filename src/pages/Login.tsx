import React, {Component} from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as APICall from '../utils/APICall';
import ErrorModal from '../components/ui/popup/ErrorModal';
import { IAuthState, IAppState } from '../reducers';
import { loginSuccessful, toggleAuthStatus } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
interface IState {
    validated : boolean;
    formFields : any;
    Error: any;
    isLoading: boolean;
    shouldRedirect: boolean;
}
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    loginSuccessful: (dataObj : object) => void;
    toggleAuthStatus: () => void;
}
export class Login extends Component<IAuthProps,IState> {
    state : IState = {
        validated : false,
        Error: {isError: false, message: ''},
        isLoading: false,
        shouldRedirect: false,
        formFields: {
            username: {
              value: ''
            },
            password: {
              value: ''
            },
            rememberme: {
                value: ''
            },
        }
      };
      handleSubmit = async (event : any) => {
        const form = event.currentTarget;
        const data = new FormData(event.target);
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else{
            this.setState({...this.state, isLoading: true});
            const result = await APICall.Login(this.state.formFields.username.value, this.state.formFields.password.value);
            if(result instanceof Error){
                this.showError(result.message);
                this.setState({...this.state, isLoading: false});
            }else{
                window.localStorage.removeItem('token');
                window.sessionStorage.removeItem('token');
                if(this.state.formFields.rememberme.value){
                    window.localStorage.setItem('token', result.token);
                }else{
                    window.sessionStorage.setItem('token',result.token)
                }
                console.log(result);
                this.props.loginSuccessful(result.message);
                this.setState({...this.state, isLoading: false, shouldRedirect: true});
            }
        }
        this.setState({...this.state, validated: true});
      };
      showError = (message : any) => {
        this.setState({...this.state, Error: {isError: true, message}});
      }
      closeError = () => {
          this.setState({...this.state, Error: {...this.state.Error, isError: false}, 
            formFields: {username: this.state.formFields.username, password: ''}});
      }

      changeHandler = (event: any) => {    
        const name = event.target.name;
        let value;
        if(!event['target']){
            value = event.checked;
        } else {
            value = event.target.value
        }
        console.log(event.target.checked);

        this.setState({...this.state,
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
                {this.state.Error.isError ? <ErrorModal errorMessage = {this.state.Error.message} 
                updateCallback= {this.closeError} isCloseable={true}></ErrorModal> : null}
                {this.state.shouldRedirect ? <Redirect to = "/home"/> : null }
                <h1 className ='page-title in-container'>Login</h1>
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
                        <Form.Check custom label="Remember Me" 
                        id="custom-rememberme-checkbox" onChange = {this.changeHandler}
                         name="rememberme"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    <span id = 'login-loading-container'>
                    {this.state.isLoading ? <Spinner variant = 'dark' animation='border'/> : null}
                    </span>
                </Form>
            </div>
        );
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
