import React, {Component, MouseEvent} from 'react';
import PropTypes from "prop-types";
import './SidebarOpen.css';
interface IProps {
    openCallback : Function,
}
interface IState {
    hoverStyle : object
}
 class SidebarOpen extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
            hoverStyle : {backgroundColor: 'rgba(255,255,255,.75)'},
        }
    }  
    static propTypes = {
        openCallback: PropTypes.func
      };
    
    handleClick = ((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        this.props.openCallback();
    });
    startHover= ((event: MouseEvent<HTMLDivElement>) => {
        this.setState({hoverStyle : {backgroundColor: '#eee'}});
    });
    endHover = ((event: MouseEvent<HTMLDivElement>) => {
        this.setState({hoverStyle : {backgroundColor: 'rgba(255,255,255,.75)'}});
    });

    render() {
        return (
            <div onClick={this.handleClick} onMouseOver={this.startHover}
            onMouseLeave={this.endHover} className = "open-container">
                <span className = 'open-symbol' style = {this.state.hoverStyle}></span>
                <span className = 'open-symbol open-symbol-2' style = {this.state.hoverStyle}></span>
                <span className = 'open-symbol open-symbol-3' style = {this.state.hoverStyle}></span>

            </div>
        );
    }
}
export {SidebarOpen};