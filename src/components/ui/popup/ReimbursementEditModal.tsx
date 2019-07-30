import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReimbursementData } from '../../../models/ReimbursementData';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

interface IProps {
    editData: ReimbursementData,
    updateCallback : Function
}
interface IState {
}
 class ReimbursementEditModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
        }
    }  
    static propTypes = {
        editData: ReimbursementData,
        updateCallback: PropTypes.func
      };
      private isOpen = true;
   handleClose = () => { this.isOpen = false;
      console.log(this.props.editData);
       this.props.updateCallback();
   }
   handleShow = () => this.isOpen = true;
    render(){
        return (
            <>
            <Modal show={this.isOpen} onHide={this.handleClose} animation centered keyboard>
              <Modal.Header closeButton>
                <Modal.Title>Edit Reimbursement</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <p>{this.props.editData.getAmount()}</p>
                  <Form.Group controlId="formGroupAuthor">
                    <Form.Label>Requestor</Form.Label>
                    <Form.Control plaintext readOnly defaultValue = {this.props.editData.getAuthor()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupAmount">
                    <Form.Label>Requested Amount</Form.Label>
                    <Form.Control type="text" defaultValue = {'' + this.props.editData.getAmount()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupDescription">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" rows="4" defaultValue = {this.props.editData.getDescription()} />
                  </Form.Group>
                  <Form.Group controlId="formGroupStatus">
                    <Form.Label>Status</Form.Label>
                    <div>
                      <ToggleButtonGroup type="radio" name="options" defaultValue={this.props.editData.getStatus()}>
                        <ToggleButton value={1} variant = 'secondary'>Pending</ToggleButton>
                        <ToggleButton value={2} variant = 'success'>Approved</ToggleButton>
                        <ToggleButton value={3} variant = 'danger'>Denied</ToggleButton>
                      </ToggleButtonGroup>
                      </div>
                  </Form.Group>
                  <Form.Group controlId="formGridRole">
                    <Form.Label>Type</Form.Label>
                      <Form.Control as="select">
                        <option value = '1'>Lodging</option>
                        <option value = '2'>Travel</option>
                        <option value = '3'>Food</option>
                        <option value = '10'>Other</option>
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
export default ReimbursementEditModal;