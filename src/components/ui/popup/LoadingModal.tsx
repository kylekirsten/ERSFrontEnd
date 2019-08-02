import React, {Component} from 'react';
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import './Modal.css';
interface IProps {
    message: string
    updateCallback : Function,
}
interface IState {
}
 class LoadingModal extends Component<IProps,IState>{
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
              <Modal.Header>
                <Modal.Title>{this.props.message}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='modal-loading-body'>
                <Spinner variant = "dark" animation = "border"/>
                <p>Loading... </p>
                </div>
              </Modal.Body>
            </Modal>
    </>
        )
    }
}
export default LoadingModal;