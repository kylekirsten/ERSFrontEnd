import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import * as APICall from '../utils/APICall';
import config from '../config.json';
import Spinner from 'react-bootstrap/Spinner';
import ErrorModal from '../components/ui/popup/ErrorModal';
import * as Format from '../utils/Format';
import { IAuthState, IAppState } from '../reducers';
import { connect } from 'react-redux';
interface IState {
    validated : boolean;
    fileArr : any[];
    formFields: any;
    Error: any;
    isLoading: boolean;
    isCreated: boolean;
    creationData: any;
    isAuthorized:boolean;
}
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
}
export class NewReimbursement extends Component<IAuthProps,IState> {
    state : IState = {
        validated : false,
        fileArr : [],
        formFields: {
            type: {
              value: ''
            },
            amount: {
              value: ''
            },
            description: {
              value: ''  
            }
        },
        Error: {isError: false, message: ''},
        isLoading: false,
        isCreated: false,
        creationData: [],
        isAuthorized: false,
      };
      componentDidMount(){

      }
      showError = (message : string) => {
          this.setState({...this.state, Error: {...this.state.Error, isError: true, message}});
      }
      closeError = () => {
          this.setState({...this.state, Error: {...this.state.Error,isError: false}});
      }
      handleSubmit = async (event : any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            this.setState({...this.state, isLoading: true});
            const formData = this.state.formFields;
            const returnData = await APICall.POST('/reimbursements', 
                {type: formData.type.value, amount: formData.amount.value, 
                description: formData.description.value});
            if(returnData instanceof Error) {
                this.showError(returnData.message);
                this.setState({...this.state, isLoading:false});
            } else {
                console.log(returnData);
                this.setState({...this.state, isLoading:false, creationData: returnData, isCreated:true});
            }
        }
        this.setState({...this.state, validated: true});
      };
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
      uploadHandler = ((event: any) => {
        if(event.target.files){
            this.setState({
                fileArr: [...this.state.fileArr, event.target.files[0]]
            });
            console.log(this.state.fileArr);
        }

      });
      fileChangedHandler = ((event: any) =>{

      });
      componentWillReceiveProps() {
      }
    render() {  
        
        return (
            <div className = "login-container">
                <h1 className ='page-title in-container'>{this.state.isCreated ? "Request Sent" : "New Reimbursement"}</h1>
                {this.state.Error.isError ? <ErrorModal errorMessage = {this.state.Error.message} 
                updateCallback= {this.closeError} isCloseable={true}></ErrorModal> : null}
                                {this.props.auth.userProfile.role.roleId < 1 ? <ErrorModal errorMessage = "You are not authorized to view this resource" 
                updateCallback= {this.closeError} isCloseable={false}></ErrorModal> : null}
                {this.state.isCreated ? <><div className = "new-reimbursement-create-info"><p>Your reimbursement request was submitted successfully.
                     A finance manager will review your reimbursement within {config.information.turnAroundRate} business days.</p>
                     <p>For your convienence, a copy of your reimbursement request is included below for future reference. Please
                        save the reference number indicated below in your records, as it will be needed for support requests.</p>
                        <p><strong>Note:</strong> If your reimbursement status is not changed after {config.information.turnAroundRate} business days, please 
                     contact support at <a href= {'mailto:' + config.information.supportEmail}>{config.information.supportEmail}</a></p> </div>
                     <hr/>
                     <div className = "new-reimbursement-create-receipt">
                         <Form.Label>Reference Number: </Form.Label> <p>{this.state.creationData.reimbursementId}</p>
                         <Form.Label>Date Submitted: </Form.Label> <p>{Format.convertTimestampToDate(this.state.creationData.dateSubmitted)}</p>
                         <Form.Label>Requestor:</Form.Label><p>{this.props.auth.userProfile.firstName + ' ' + this.props.auth.userProfile.lastName}</p>
                         <Form.Label>Reimbursement Type: </Form.Label><p>{this.state.creationData.type.type}</p>
                         <Form.Label>Amount Requested: </Form.Label><p>${this.state.creationData.amount}</p>
                         <Form.Label>Comments: </Form.Label><p>{this.state.creationData.description}</p>
                         <Form.Label>Status:</Form.Label><p>{this.state.creationData.status.status}</p>
                     </div>
                    </>

                : <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control required onChange={this.changeHandler} size="lg" as="select" 
                        className = 'custom-select' value = {this.state.formFields.type.value} name = "type">
                            <option selected>Choose one...</option>
                            <option value = '1'>Lodging</option>
                            <option value = '2'>Travel</option>
                            <option value = '3'>Food</option>
                            <option value = '10'>Other</option>
                        <Form.Control.Feedback type="invalid">
                            Please select a reimbursement type
                        </Form.Control.Feedback>
                        </Form.Control>
                    </Form.Group>  
                    <Form.Group controlId="formAmount">
                        <Form.Label>Requested Amount</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control required onChange={this.changeHandler} size="lg" type="number" 
                            step="0.01" min="0" max = "10000" value = {this.state.formFields.amount.value}
                            id = "new-reimbursement-amount" placeholder = "0.00" name="amount"/>
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
                        <Form.Control required onChange={this.changeHandler} as="textarea" rows="4" 
                                     placeholder = "Short Description" value= {this.state.formFields.description.value}
                                     name = "description"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter some comments about your reimbursement request.
                        </Form.Control.Feedback>   
                  </Form.Group>
                  <Form.Group controlId="receiptUpload">
                    <Form.Label>Upload Receipt (Optional)</Form.Label>
                    <br/>
                    <input type="file" onChange={this.fileChangedHandler}/>
                    <Button variant = 'success' onClick={this.uploadHandler}>Upload</Button>
                    <Form.Control.Feedback type="invalid">
                            Please enter upload a valid file type
                        </Form.Control.Feedback>   
                  </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit Reimbursement
                    </Button>
                    <span id = 'login-loading-container'>
                    {this.state.isLoading ?<Spinner variant = 'dark' animation='border'/> : null}
                    </span>
                </Form> }
            </div>
        );
    
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(NewReimbursement);