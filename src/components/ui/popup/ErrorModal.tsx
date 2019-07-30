import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    errorMessage: string
    updateCallback : Function,
}
interface IState {
}
 class ErrorModal extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
        }
    }  
    static propTypes = {
        errorMessage: PropTypes.string,
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
                <Modal.Title>Error!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{this.props.errorMessage}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
    </>
        )
    }
}
export default ErrorModal;