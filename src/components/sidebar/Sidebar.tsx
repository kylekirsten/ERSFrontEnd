import React, {Component} from 'react';
import './Sidebar.css';
import PropTypes from "prop-types";
import SidebarButton from './SidebarButton';
import {SidebarOpen} from './SidebarOpen';
import  {Cross} from '../dialog/Cross';
import {NavigationButton} from '../../models/NavigationButton';
interface IState {
    visible: boolean,
    Buttons: NavigationButton[],
}
interface IProps {
    startVisible : boolean;
}
export default class Sidebar extends Component<IProps,IState> {
    static propTypes = {
        startVisible : PropTypes.bool,
    }
    state : IState = {
        visible : this.props.startVisible,
        Buttons : [new NavigationButton('/login','My Account'),
                   new NavigationButton('/newreimbursement','New Reimbursement'),
                   new NavigationButton('/reimbursements','Reimbursement Management'),
                   new NavigationButton('/users','User Management'),
                   new NavigationButton('/login','Login')],
    }
    sidebarOpen = () => {
        this.setState({...this.state, visible: true});
    }
    sidebarClose = () => {
        this.setState({...this.state, visible : false});
    }
    render() {
        //Style hides the sidebar with animation if visible is set to false. Otherwise it is displayed
        const style = this.state.visible ? {transition: 'all 0.5s ease-in-out'} 
        : {transform: 'translate3d(0, -100%, 0)',
        transition: 'all 0.5s ease-in-out'};
        const buttonArray : any = this.state.Buttons.map((i : any) => {
                return (<SidebarButton key = {this.state.Buttons.indexOf(i)} text = {i.getText()} 
                                       route = {i.getRoute()} color = {i.getColor()} clickCallback={this.sidebarClose}></SidebarButton>);
        })
        return (
            <>
                <SidebarOpen openCallback = {this.sidebarOpen}/>
                <div className = 'sidebar' style = {style}>
                    <Cross exitCallback = {this.sidebarClose}/>
                    <h1>Quick Menu</h1>
                    {buttonArray}
                </div>
            </>
            
        );
    }
}
