import React, {Component} from 'react';
import PropTypes from "prop-types";
import './SidebarButton.css';
import { Link } from 'react-router-dom';
interface IState {
}
interface IProps {
    text : string,
    route : string,
    color : string,
    clickCallback: Function,
}
export default class SidebarButton extends Component<IProps, IState> {
    static propTypes = {
        text: PropTypes.string,
        route: PropTypes.string,
        color: PropTypes.string,
        clickCallback: PropTypes.func
      };
    handleClick = (e : any) => {
        this.props.clickCallback();
    };
    
    render() {
        return (
            <button onClick = {this.handleClick} className = 'sidebarButton'>
                <Link to = {this.props.route}>{this.props.text} </Link>
            </button>
        );
    }
}