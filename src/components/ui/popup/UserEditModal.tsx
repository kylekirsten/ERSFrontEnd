import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserData } from '../../../models/UserData';
import Form from 'react-bootstrap/Form';

interface IProps {
    editData: UserData
    updateCallback : Function,
}
interface IState {
}
 class UserEditModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
        }
    }  
    static propTypes = {
        editData: UserData,
        updateCallback: PropTypes.func
      };
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
                    <Form.Control type="text" defaultValue = {this.props.editData.getUsername()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue = {this.props.editData.getFirstName()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue = {this.props.editData.getLastName()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue = {this.props.editData.getEmail()} />
                  </Form.Group>
                  <Form.Group controlId="formGridRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select">
                      <option value = 'user'>User</option>
                      <option value = 'finance-manager'>Finance Manager</option>
                      <option value = 'admin'>Administrator</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
    </>
        )
    }
}
export default UserEditModal;