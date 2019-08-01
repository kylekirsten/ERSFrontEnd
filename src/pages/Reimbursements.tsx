import React, {Component} from 'react';
import {ReimbursementsTable, Status} from '../components/ui/table/ReimbursementsTable';
import './Reimbursements.css';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
interface IState {
    activeKey : string;
    pendingTableContents : any;
    approvedTableContents: any;
    deniedTableContents : any;
}
export default class Reimbursements extends Component<{},IState> {
    constructor(props : any){
        super(props);
        this.state = {
            activeKey: 'pending',
            pendingTableContents : null,
            approvedTableContents : null,
            deniedTableContents : null,
        }
    }
    componentDidMount() {
        this.setState({pendingTableContents : <ReimbursementsTable status = {Status.Pending}></ReimbursementsTable>})
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
    render() {  
        return (
            <>
            <h1 className ='page-title'>REIMBURSEMENT MANAGEMENT</h1>
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
