import React, {Component} from 'react';
import {ReimbursementsTable, Status} from '../components/ui/table/ReimbursementsTable';
import './Reimbursements.css';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { IAuthState, IAppState } from '../reducers';
import { connect } from 'react-redux';
import ErrorModal from '../components/ui/popup/ErrorModal';
interface IState {
    activeKey : string;
    pendingTableContents : any;
    approvedTableContents: any;
    deniedTableContents : any;
    isAuthorized: boolean;
    userRole: number;
}
export interface IAuthProps {
    auth: IAuthState,
}
export class Reimbursements extends Component<IAuthProps,IState> {
    constructor(props : any){
        super(props);
        this.state = {
            activeKey: 'pending',
            pendingTableContents : null,
            approvedTableContents : null,
            deniedTableContents : null,
            isAuthorized: false,
            userRole : this.props.auth.userProfile.role.roleId,
        }
    }
    componentDidMount() {
        this.setState({pendingTableContents : <ReimbursementsTable status = {Status.Pending}></ReimbursementsTable>});

    }
    lazyLoadTabs = (activeKey : string) => {
        this.setState({activeKey});
        switch(activeKey){
          case 'approved':
                this.state.approvedTableContents === null ?
                    this.setState({approvedTableContents : 
                    <ReimbursementsTable status = {Status.Approved}></ReimbursementsTable>}): console.log('hi');
                break;
            case 'denied':
                this.state.deniedTableContents === null ?
                    this.setState({deniedTableContents : 
                    <ReimbursementsTable status = {Status.Denied}></ReimbursementsTable>}): console.log('hi');
                break;
        }
    }
    componentWillReceiveProps(){

    }
    render() {  
        console.log(this.props.auth.userProfile.role.roleId)
        return (
            <>
            <h1 className ='page-title'>REIMBURSEMENT MANAGEMENT</h1>
            {this.state.userRole >= 2 ? null : <ErrorModal updateCallback={() => {return}} 
            errorMessage = "You are unauthorized to view this resource" isCloseable= {false}/>}
            <Tab.Container defaultActiveKey="pending" onSelect = {this.lazyLoadTabs} transition = {false} id="reimbursement-tabs">
                <Nav justify variant="pills">
                    <Col sm = {12} lg = {4}>
                        <Nav.Item className = 'reimbursement-tab'>
                            <Nav.Link as = "a" eventKey="pending">Pending</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <Nav.Item className = 'reimbursement-tab'>
                            <Nav.Link as = "a" eventKey="approved">Approved</Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col sm = {12} lg = {4}>
                        <Nav.Item className = 'reimbursement-tab'>
                            <Nav.Link as = "a" eventKey="denied">Denied</Nav.Link>
                        </Nav.Item>
                    </Col>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="pending">
                        {this.state.pendingTableContents}
                    </Tab.Pane>
                    <Tab.Pane eventKey="approved">
                        {this.state.approvedTableContents}
                    </Tab.Pane>
                    <Tab.Pane eventKey="denied">
                        {this.state.deniedTableContents}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>


            </>
        );
    
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Reimbursements);
