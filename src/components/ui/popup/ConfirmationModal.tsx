import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    message: string
    updateCallback : Function,
}
interface IState {
}
 class ConfirmationModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
        }
    }  
    static propTypes = {
        message: PropTypes.string,
        updateCallback: PropTypes.func
      };
      private isOpen = true;
   handleClose = (confirmation : boolean) => { this.isOpen = false;
       this.props.updateCallback(confirmation);
   }
   handleShow = () => this.isOpen = true;
    render(){
        return (
            <>
            <Modal show={this.isOpen} onHide={() => {this.handleClose(false)}} animation centered keyboard>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to {this.props.message}?</p>
                <p>Please be aware, this change may not be easily reversible.</p>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="danger" onClick={() => {this.handleClose(false)}}>
                  No
                </Button>
                <Button variant="success" onClick={() => {this.handleClose(true)}}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
    </>
        )
    }
}
export default ConfirmationModal;