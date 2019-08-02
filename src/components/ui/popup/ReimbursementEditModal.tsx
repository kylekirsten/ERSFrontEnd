import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import { ReimbursementData } from '../../../models/ReimbursementData';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import * as APICall from '../../../utils/APICall';
import ErrorModal from './ErrorModal';
import Spinner from 'react-bootstrap/Spinner'

interface IProps {
    editData: ReimbursementData,
    updateCallback : Function
}
interface IState {
  bestBoolean : boolean;
  formFields: any;
  Error: {
    isError : boolean,
    message: string,
  };
  validated: boolean;
  isLoading: boolean;
  isHidden: boolean;
}
 class ReimbursementEditModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        console.log(props);
        this.state = {
          bestBoolean : true,
          formFields: {
            amount: {
              value: this.props.editData.getAmount()
            },
            description: {
              value: this.props.editData.getDescription()
            },
            status : {
              value: this.props.editData.getStatus()
            },
            type : {
              value: this.props.editData.getType()
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

      private isOpen = true;
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
   handleClose = () => { this.isOpen = false;
       this.props.updateCallback();
       this.setState({...this.state,isHidden: true});
   }
   handleShow = () => this.isOpen = true;
   handleRevert = () => {
     this.setState({formFields: {
      amount: {
        value: this.props.editData.getAmount()
      },
      description: {
        value: this.props.editData.getDescription()
      },
      status : {
        value: this.props.editData.getStatus()
      },
      type : {
        value: this.props.editData.getType()
      }
     }});
   }
   sendRequest = async () => {
      const formData = Object.assign(this.state.formFields);
      const patchData = await APICall.PATCH('/reimbursements',
      {reimbursementId: this.props.editData.getId(), amount: formData.amount.value, 
       description: formData.description.value, type: formData.type.value, 
       status: formData.status.value});
       if(patchData instanceof Error) {
         this.showError(patchData.message);
       } else {
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
       name = 'status';
       value = event
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
    render(){
        return (
            <>
            <Modal show={!this.state.Error.isError && !this.state.isHidden} onHide={this.handleClose} animation centered keyboard>
              <Modal.Header closeButton>
                <Modal.Title>Edit Reimbursement #{this.props.editData.getId()}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={(e : any) => {this.handleSubmit(e)}} noValidate validated={this.state.validated}>
              <Modal.Body>
                  <Form.Group controlId="formGroupAuthor">
                    <p className = "strong">Requestor: </p> {this.props.editData.getNestedAuthorFullName()}
                  </Form.Group>
                  <Form.Group controlId="formGroupStatus">
                    <Form.Label>Status</Form.Label>
                    <div className = 'edit-reimbursement-status-box'>
                      <ToggleButtonGroup required exclusive onChange = {this.changeHandler} 
                                    value={this.state.formFields.status.value} name= "status">
                        <ToggleButton centerRipple value = {1} variant = 'secondary'>Pending</ToggleButton>
                        <ToggleButton centerRipple value = {2} variant = 'success'>Approved</ToggleButton>
                        <ToggleButton value = {3} variant = 'danger'>Denied</ToggleButton>
                      </ToggleButtonGroup>
                      </div>
                  </Form.Group>
                  <Form.Group controlId="formGridRole">
                    <Form.Label>Type</Form.Label>
                      <Form.Control required className = 'custom-select' as="select" value = {'' + this.state.formFields.type.value}
                                    onChange = {this.changeHandler} name = "type">
                        <option value = '1'>Lodging</option>
                        <option value = '2'>Travel</option>
                        <option value = '3'>Food</option>
                        <option value = '10'>Other</option>
                      </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formAmount">
                      <Form.Label>Amount</Form.Label>
                      <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control required size="lg" type="number" step="0.01" min="0.01" max = "10000" 
                                          id = "new-reimbursement-amount" value = {'' + this.state.formFields.amount.value}
                                          onChange = {this.changeHandler} name="amount"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid reimbursement amount
                        </Form.Control.Feedback>   
                        <Form.Text className="text-muted">
                            Enter any valid number (up to 2 decimal places) between $0.00 and $10000.00.
                        </Form.Text>
                      </InputGroup> 
                  </Form.Group>
                  <Form.Group controlId="formGroupDescription">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control required as="textarea" rows="4" value = {this.state.formFields.description.value}
                                  onChange = {this.changeHandler} name="description"/>
                    <Form.Control.Feedback type="invalid">
                            Please enter a valid description
                    </Form.Control.Feedback>   
                  </Form.Group>
                <div className = 'edit-reimbursement-buttons'>
                  <Button variant="danger" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button variant="secondary" onClick={this.handleRevert}>
                  Revert Changes
                </Button>
                <input className="btn btn-primary" type = "submit" value = "Save Changes"/>
                <p>{this.state.isLoading}</p>
                {this.state.isLoading ? <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner> : null}
              </div>
              </Modal.Body>

            </Form>

            </Modal>
            {this.state.Error.isError ? <ErrorModal errorMessage = {this.state.Error.message} 
            updateCallback= {this.closeError} isCloseable={true}></ErrorModal> : null}
    </>
        )
    }
}
export default ReimbursementEditModal;