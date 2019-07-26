import React, {Component, MouseEvent} from 'react';
import PropTypes from "prop-types";
import './Cross.css';
interface IProps {
    exitCallback : Function,
}
interface IState {
    hoverStyle : object
}
 class Cross extends Component<IProps,IState>{
    state : IState = {hoverStyle: {backgroundColor: '#555'}};
    static propTypes = {
        exitCallback: PropTypes.func
      };
    
    handleClick = ((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.props.exitCallback();
    });
    startHover= ((event: MouseEvent<HTMLDivElement>) => {
        this.setState({hoverStyle : {backgroundColor: '#ddd'}});
    });
    endHover = ((event: MouseEvent<HTMLDivElement>) => {
        this.setState({hoverStyle : {backgroundColor: '#555'}});
    });

    render() {
        return (
            <div onClick={this.handleClick} onMouseOver={this.startHover}
            onMouseLeave={this.endHover} className = "cross-container">
                <span className = 'cross' style = {this.state.hoverStyle}></span>
                <span className = 'cross cross-2' style = {this.state.hoverStyle}></span>
            </div>
        );
    }
}
export {Cross};