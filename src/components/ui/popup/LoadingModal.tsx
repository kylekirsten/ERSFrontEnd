import React, {Component, MouseEvent} from 'react';
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';

interface IProps {
    message: string
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
        message: PropTypes.string,
      };
    render(){
        return (
            <>
            <Modal show={true} animation centered>
              <Modal.Header closeButton>
                <Modal.Title>Loading...</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{this.props.message}</p>
              </Modal.Body>
            </Modal>
    </>
        )
    }
}
export default ErrorModal;