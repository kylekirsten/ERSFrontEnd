import React, {Component} from 'react';
import './Sidebar.css';
import PropTypes from "prop-types";
import SidebarButton from './SidebarButton';
import {SidebarOpen} from './SidebarOpen';
import  {Cross} from '../dialog/Cross';
import {NavigationButton} from '../../models/NavigationButton';
import { IAuthState, IAppState } from '../../reducers';
import {connect} from 'react-redux';
interface IState {
    visible: boolean,
    Buttons: NavigationButton[],
}
interface ComponentProps {
    startVisible : boolean;
}
export interface IAuthProps {
    auth: IAuthState,
}
type IProps = ComponentProps & IAuthProps;
export class Sidebar extends Component<IProps,IState> {

    state : IState = {
        visible : this.props.startVisible,
        Buttons : [new NavigationButton('/reimbursements/' + this.props.auth.userProfile.userId,'My Reimbursements', 1,10),
                   new NavigationButton('/newreimbursement','New Reimbursement', 1,10),
                   new NavigationButton('/reimbursements','Reimbursement Management', 2,10),
                   new NavigationButton('/users','User Management', 2,10),
                   new NavigationButton('/home','Home', 0, 10),
                   new NavigationButton('/login','Login', 0, 0)],

    }
    componentDidMount() {
        
    }
    componentDidUpdate(oldProps: { auth: any; }) {
        const newProps = this.props
        if(oldProps.auth !== newProps.auth) {
          this.setState({Buttons : [new NavigationButton('/reimbursements/' + this.props.auth.userProfile.userId,'My Reimbursements', 1,10),
          new NavigationButton('/newreimbursement','New Reimbursement', 1,10),
          new NavigationButton('/reimbursements','Reimbursement Management', 2,10),
          new NavigationButton('/users','User Management', 2,10),
          new NavigationButton('/home','Home', 0, 10),
          new NavigationButton('/login','Login', 0, 0)],})
        }
      }
    sidebarOpen = () => {
        this.setState({...this.state, visible: true});
    }
    sidebarClose = () => {
        this.setState({...this.state, visible : false});
    }
    render() {
        let userRole : number;
        if(this.props.auth.userProfile){
            userRole = this.props.auth.userProfile.role.roleId;
        } else {
            userRole = 0;
        }
        let showButtons = this.state.Buttons.filter((element : NavigationButton) => {
            if(userRole >= element.getMinimumRole() && userRole <= element.getMaximumRole()){
                if(element.getRoute() === '/reimbursements/'){
                    element.setUrl('/reimbursements/' + this.props.auth.userProfile.userId)
                }
                return element;
            }
            return false;
        })
        //Style hides the sidebar with animation if visible is set to false. Otherwise it is displayed
        const style = this.state.visible ? {transition: 'all 0.5s ease-in-out'} 
        : {transform: 'translate3d(0, -100%, 0)',
        transition: 'all 0.5s ease-in-out'};
        const buttonArray : any = showButtons.map((i : any) => {
                return (<SidebarButton key = {showButtons.indexOf(i)} text = {i.getText()} 
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
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Sidebar);