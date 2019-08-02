import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserData } from '../../../models/UserData';
import Form from 'react-bootstrap/Form';
import * as APICall from '../../../utils/APICall';
import Spinner from 'react-bootstrap/Spinner';
import ErrorModal from './ErrorModal';

interface IProps {
    editData: UserData
    updateCallback : Function,
}
interface IState {
  formFields: any;
  Error: {
    isError : boolean,
    message: string,
  };
  validated: boolean;
  isLoading: boolean;
  isHidden: boolean;
}
 class UserEditModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
          formFields: {
            username: {
              value: this.props.editData.getUsername()
            },
            firstname: {
              value: this.props.editData.getFirstName()
            },
            password: {
              value: ''
            },
            lastname : {
              value: this.props.editData.getLastName()
            },
            email : {
              value: this.props.editData.getEmail()
            },
            role : {
              value: this.props.editData.getRole()
            }
          },
          Error: {
            isError: false,
            message: ''
          },
          validated: false,
          isLoading: false,
          isHidden: false,
        }
    }  
    static propTypes = {
        editData: UserData,
        updateCallback: PropTypes.func
      };
      handleSubmit = (event : any) => {
        this.setState({...this.state, isLoading: true})
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
           event.stopPropagation();
        } else {
          this.sendRequest();
        }
        this.setState({...this.state, validated: true})
      };
    showError = (message : any) => {
      this.setState({...this.state, Error: {...this.state.Error, isError: true, message}})
      }
    closeError = () => {
      this.setState({...this.state, Error: {...this.state.Error, isError: false}});

      }
   handleRevert = () => {
     this.setState({formFields: {
      username: {
        value: this.props.editData.getUsername()
      },
      password: {
        value: '',
      },
      firstname: {
        value: this.props.editData.getFirstName()
      },
      lastname : {
        value: this.props.editData.getLastName()
      },
      email : {
        value: this.props.editData.getEmail()
      },
      role : {
        value: this.props.editData.getRole()
      }
     }});
   }
   sendRequest = async () => {
      const formData = Object.assign(this.state.formFields);
      let data : any = {userid: this.props.editData.getId(),
        username: this.state.formFields.username.value,
      firstname: this.state.formFields.firstname.value,
      lastname: this.state.formFields.lastname.value,
      email: this.state.formFields.email.value,
      role: this.state.formFields.role.value};
      if(this.state.formFields.password.value !== ''){
        data.hash = this.state.formFields.password.value;
      }
      const patchData = await APICall.PATCH('/users',data);
      console.log(await patchData);
       if(patchData instanceof Error) {
         this.setState({...this.state,isLoading: false});
         this.showError(patchData.message);
       } else {
        this.setState({...this.state,isLoading: false})
      this.handleClose();
       }
   }
   changeHandler = (event: any) => {
     let name = '';
     let value = '';
     if(event['target']){
       name = event.target.name;
       value = event.target.value;
     }else {
       name = 'role';
       value = event.selected
     }
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
      private isOpen = true;
   handleClose = () => { this.isOpen = false;
       this.props.updateCallback();
   }
   handleShow = () => this.isOpen = true;
    render(){
        return (
            <>
            <Modal show={this.isOpen} onHide={this.handleClose} animation centered keyboard>
              <Modal.Header closeButton>
                <Modal.Title>Edit User: {this.props.editData.getUsername()}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required value = {this.state.formFields.username.value} name="username" onChange = {this.changeHandler} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                            Please enter a valid username
                        </Form.Control.Feedback>   

                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value = {this.state.formFields.password.value} name="password" onChange = {this.changeHandler} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                            Please enter a password
                        </Form.Control.Feedback>   
                        <Form.Text className="text-muted">
                            Only put text in this field if you wish to change the user's password. Leave blank if you do not wish to do so.
                        </Form.Text>
                  <Form.Group controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" required value = {this.state.formFields.firstname.value} name="firstname" onChange = {this.changeHandler} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                            Please enter a valid first name.
                        </Form.Control.Feedback>   
                  <Form.Group controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" required  value = {this.state.formFields.lastname.value} name="lastname" onChange = {this.changeHandler} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                            Please enter a valid last name.
                        </Form.Control.Feedback>   
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required value = {this.state.formFields.email.value} name="email" onChange = {this.changeHandler} />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>   
                  <Form.Group controlId="formGridRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control required as="select" name="role" value = {this.state.formFields.role.value} onChange = {this.changeHandler}>
                      <option value = {1}>User</option>
                      <option value = {2}>Finance Manager</option>
                      <option value = {10}>Administrator</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleRevert}>
                  Revert Changes
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Save Changes
                </Button>
                {this.state.isLoading ? <Spinner variant = "dark" animation = "border"/> : null }
                {this.state.Error.isError ? <ErrorModal updateCallback = {this.closeError} errorMessage = {this.state.Error.message} isCloseable={true}/>
                : null }
              </Modal.Footer>
            </Modal>
    </>
        )
    }
}
export default UserEditModal;