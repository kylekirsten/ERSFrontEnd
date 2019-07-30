import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Redirect } from 'react-router';
interface IState {
    validated : boolean;
    fileArr : any[];
}
export default class Login extends Component {
    state : IState = {
        validated : false,
        fileArr : [],
      };
      handleSubmit = (event : any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        this.setState({...this.state, validated: true});
      };
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
    render() {  
        return (
            <div className = "login-container">
                <h1 className ='page-title'>New Reimbursement</h1>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control required size="lg" as="select" className = 'custom-select' defaultValue = {0}>
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
                            <Form.Control required size="lg" type="number" step="0.01" min="0" max = "10000" 
                                          id = "new-reimbursement-amount" placeholder = "0.00"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid reimbursement amount
                        </Form.Control.Feedback>   
                        <Form.Text className="text-muted">
                            Enter any valid number (up to 2 decimal places) between $0.00 and $10000.00.
                        </Form.Text>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            Please select a reimbursement amount
                        </Form.Control.Feedback>    
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control required as="textarea" rows="4" placeholder = "Short Description"/>
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
                </Form>
            </div>
        );
    
    }
}