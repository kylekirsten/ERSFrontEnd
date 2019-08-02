import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    errorMessage: string
    updateCallback : Function,
    isCloseable: boolean,
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
        updateCallback: PropTypes.func,
        isCloseable: PropTypes.bool,
      };
      private isOpen = true;
   handleClose = () => { this.isOpen = false;
       this.props.updateCallback();
   }
   handleShow = () => this.isOpen = true;
    render(){
        return (
            <>
            <Modal show={this.isOpen} onHide={this.handleClose} animation centered keyboard={this.props.isCloseable}>
              <Modal.Header closeButton={this.props.isCloseable}>
                <Modal.Title>Error!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{this.props.errorMessage}</p>
              </Modal.Body>
              <Modal.Footer>
              {this.props.isCloseable ?
                <Button variant="secondary" onClick={this.handleClose}>
                  OK
                </Button>
              : null}
              </Modal.Footer>

            </Modal>
    </>
        )
    }
}
export default ErrorModal;