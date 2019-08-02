import React, {Component} from 'react';
import './Reimbursements.css';
import * as Format from '../utils/Format';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import * as APICall from '../utils/APICall';
import ErrorModal from '../components/ui/popup/ErrorModal';
import Icon from '@material-ui/core/Icon';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { IAuthState, IAppState } from '../reducers';
import { RouteComponentProps } from 'react-router-dom';
import { loginSuccessful, toggleAuthStatus } from '../actions/Authentication.action';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';

interface IState {
    isLoading: boolean;
    Error: any;
    reimbursementData: any;
    userData: any;
    isAuthorized: boolean;
}
type RouteParams = {
    userId: string; // must be type string since route params
}
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    //Action creators from the dispatcher
    loginSuccessful: (dataObj : object) => void;
    toggleAuthStatus: () => void;
}
type IProps = RouteComponentProps<RouteParams> & IAuthProps;
interface ComponentProps {
}
function compareArr(a : any, b : any) {
    const dateSubmittedA = a.dateSubmitted
    const dateSubmittedB = b.dateSubmitted
    let comparison = 0;
    if (dateSubmittedA > dateSubmittedB) {
      comparison = 1;
    } else if (dateSubmittedA < dateSubmittedB) {
      comparison = -1;
    }
    return comparison * -1;
  }
export class MyReimbursements extends Component<IProps,IState> {
    constructor(props : any){
        super(props);
        this.state = {
            isLoading : true,
            Error: {isError: false, message: ''},
            reimbursementData:
             [{reimbursementId: null, author: null, description: '', status: {statusId: 0, status:'loading'}, resolver: 'loading' }],
            userData: {userName: 'loading', hash: '', firstName: 'loading', lastName: '', email: '', role: {roleId: 0, role:'User'}},
            isAuthorized: false,
        }
    }
    componentDidUpdate(prevProps : any) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.getReimbursements(parseInt(this.props.match.params.userId,10));
        }
    }
    componentDidMount() {
        this.getReimbursements(parseInt(this.props.match.params.userId,10));
    }
    showError(message : string){
        this.setState({...this.state, Error: {...this.state.Error, isError: true, message: message}});
    }
     getReimbursements = async (userId : number) => {
        if(userId !== this.props.auth.userProfile.userId){
            let userData = await APICall.GET('/users/' + userId);
            if(userData instanceof Error){
                this.showError(userData.message);
            } else {
                this.setState({...this.state, userData: userData});
            }
        }
        let data = await APICall.GET('/reimbursements/author/userId/'+ userId);
        if(data instanceof Error){
            this.showError(data.message);
        } else {
            this.setState({...this.state, reimbursementData: data.sort(compareArr)});
        }
        this.setState({...this.state,isLoading: false});
    }
    closeErrorModal =(() => {
        this.setState({...this.state, Error: {isError: false, message: ''}})
    });
    componentWillReceiveProps() {
    let userRole : number;
    if(this.props.auth.userProfile){
        userRole = this.props.auth.userProfile.role.roleId;
    } else {
        userRole = 0;
    }
    if(userRole >= 1){
        this.setState({...this.state,isAuthorized: true});
        }
    }
    render() {  
        return (
            <>
            <h1 className ='page-title'>{this.props.auth.userProfile.userId === parseInt(this.props.match.params.userId,10) || 
            this.props.auth.userProfile.role.roleId < 2
             ? "My Reimbursements"
            : `${this.state.userData.firstName} ${this.state.userData.lastName}'s Reimbursements`}

            </h1><div className = "loading-container">{this.state.isLoading ? <Spinner animation="border" variant="light" />: null} </div>
            {this.state.Error.isError ? <ErrorModal errorMessage={this.state.Error.message} 
            updateCallback = {this.closeErrorModal} isCloseable={true}/>
            : null}
            {(this.props.auth.userProfile.role.roleId === 1 && 
            this.props.auth.userProfile.userId !== parseInt(this.props.match.params.userId))
            ?
            <ErrorModal errorMessage='You are not authorized to view this resource' 
            updateCallback = {this.closeErrorModal} isCloseable={false}/> : null
            }
            
            <Tab.Container id="left-tabs-example" defaultActiveKey={0} transition={false}>
                <Row>
                <Col sm={3} >
                    <Nav variant="pills" className="my-reimbursement-tabs" role="tablist">
                        {this.state.reimbursementData.map((element : any, index: number) => {
                             return ( this.state.isLoading || this.state.reimbursementData[0].author === null ? null :<Nav.Item>
                            <Nav.Link eventKey={index}> <span className = 'my-reimbursements-datetab'>
                                {Format.convertTimestampToDate(element.dateSubmitted)}</span>
                            {element.status.statusId === 1 ? 
                            <Icon>query_builder</Icon> : (element.status.statusId === 2 ? <Icon>done</Icon> : <Icon>clear</Icon>) }{  
                            }</Nav.Link>
                        </Nav.Item>
                        )})}
                    </Nav>
                </Col>  
                <Col sm={9}>
                    <Tab.Content>
                        {this.state.reimbursementData.map((element: any, index: number) => {
                            return ( this.state.isLoading || this.state.reimbursementData[0].author === null ? null :
                            <Tab.Pane eventKey={index}>
                            <div className = 'reimbursement-description-container'>
                            <h2 className = 'reimbursement-data-title'>{Format.convertTimestampToDate(element.dateSubmitted)}</h2>
                            <Row><Col md= {element.dateResolved === null ? 12 : 6}><FormLabel>Status:</FormLabel> 
                            <p>{Format.uppercaseFirstLetter(element.status.status)}</p></Col>
                            {(element.dateResolved !== null ) ?
                            <Col md = {6}><Form.Label>Resolved:</Form.Label>
                                <OverlayTrigger trigger="hover" placement="right"  delay={{ show: 300, hide: 300 }}
                                overlay={
                                    <Tooltip id={'data-dateresolved-' + index}>
                                    {Format.convertTimestampToDate(element.dateResolved)}</Tooltip>
                                }>
                                <a className = "myreimbursements-dateresolved-link">
                                {' '+Format.readableTimestampSubtract(element.dateResolved)}</a>
                                </OverlayTrigger>
                                </Col> : null}
                            </Row>
                            <Row><Col sm= {6} md={4}><Form.Label>Amount Requested: </Form.Label><p>${element.amount}</p></Col>
                            <Col sm = {0} md={0} lg={4}><span className="dot"></span></Col>
                            <Col sm = {6} md={4}><Form.Label>Type:</Form.Label><p>{Format.uppercaseFirstLetter(element.type.type)}</p></Col></Row>
                            <Row><Col><Form.Label>Comments:</Form.Label>
                            <p>{element.description}</p></Col></Row>
                            </div></Tab.Pane>
                        )})}
                    </Tab.Content>
                </Col>
            </Row>
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
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful: loginSuccessful,
    toggleAuthStatus: toggleAuthStatus
}
export default connect(mapStateToProps, mapDispatchToProps)(MyReimbursements);
