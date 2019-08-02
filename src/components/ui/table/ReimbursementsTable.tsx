import React, {Component} from 'react';
import MaterialTable from 'material-table';
import * as APICall from '../../../utils/APICall';
import ErrorModal from '../popup/ErrorModal'
import { ReimbursementData } from '../../../models/ReimbursementData';
import ReimbursementEditModal from '../popup/ReimbursementEditModal';
import * as Format from '../../../utils/Format';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Table.css';
import Tooltip from 'react-bootstrap/Tooltip';
import ConfirmationModal from '../popup/ConfirmationModal';
export enum Status{
  Pending = "Pending",
  Approved = "Approved",
  Denied = "Denied"
}
interface IProps {
  status: Status
}
interface IState {
    data : object[];
    tableIsLoading : boolean;
    currentReimbursementModal: ReimbursementData;
    currentModalTemplate : any;
    Error: any;
    tableStructure : any;
    editData: ReimbursementData;
    isEditing : boolean;
    bulkAction : any;
}
export class ReimbursementsTable extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
            data : [{author: {userId: 0, userName: 'loading', firstName: 'loading', lastName: 'loading',
             email: 'loading', role: {roleId: 0, role: 'loading'}}, resolver:
              {userId: 0, userName: 'loading', firstName: 'loading', lastName: 'loading',
              email: 'loading', role: {roleId: 0, role: 'loading'}}
              ,dateSubmitted: 1000000, dateResolved: 10000000, type: {typeId: 0, type: 'loading'}}],
            tableIsLoading : true,
            currentReimbursementModal : new ReimbursementData(false, {}),
            currentModalTemplate : null,
            Error: {
              isError : false,
              message : '',
            },
            tableStructure: <div></div>,
            editData: new ReimbursementData(false, {}),
            isEditing: false,
            bulkAction: {
              currentAction: null,
              isConfirmed: true,
              editData : []
            }
        }
    }  
    editModalClose = (() => {
      this.state.currentReimbursementModal.toggleOpenState();
      this.loadData();
      this.setState({...this.state, isEditing: false});

    });
    editModalOpen = ((data : any) => {
      let dataInside = data;
      this.setState({...this.state, isEditing: true, editData: new ReimbursementData(false, dataInside)});
      
    })
    errorModalClose = (() => {
      this.setState({...this.state, Error:{...this.state.Error,isError: false}})
    });
    showServerError = (message : any) => {
      this.setState({...this.state, Error:{...this.state.Error,isError: true, message}})
    }
    async PopulateUserData(loadedData : any) {
      return await Promise.all(loadedData.map(async (element : any) => {
        let authorData = await APICall.GET(`/users/${element.author}`);
        let resolverData;
        if(element.resolver){
          resolverData = await APICall.GET(`/users/${element.resolver}`);
        }
        let newElement = Object.assign({},element);
        if(authorData instanceof Error || resolverData instanceof Error){
          newElement.resolver = {userName: 'Error'};
          newElement.author = {userName: 'Error'};
          return await newElement;
        }else{
          newElement.resolver = resolverData;
          newElement.author = authorData;
          return await newElement;
          }
      }));
    }

    async loadData() {
        //this.setState({data: [{userName: 'loading'},{userName: 'loading'}]});
        const loadedData = await APICall.GET(`/reimbursements/status/${this.props.status}`);

        //If APICall returns an error, show the error modal.
        if(loadedData instanceof Error){
          this.showServerError(loadedData.message);
        }else{
          let passedData : any[] = await this.PopulateUserData(loadedData);
          this.setState({data : passedData
            , tableIsLoading : false});   
        }
    }
    componentDidMount(){
        this.loadData();
    }
     bulkActionHandler  =  (async(confirmed : boolean) => {
      this.setState({bulkAction: {...this.state.bulkAction, isConfirmed: confirmed}});
      if(!confirmed) { return;}
      this.setState({tableIsLoading: true});
      let keyword = this.state.bulkAction.currentAction;
      let arr = await this.state.bulkAction.editData.forEach(async (element : any, index: number) => {
        const loadedData = await APICall.PATCH('/reimbursements',
                            {reimbursementId: element.reimbursementId, status: keyword});
        if(loadedData instanceof Error){
          this.showServerError('Could not perform all actions due to : ' + loadedData.message);
          return;
        }
        if(index === this.state.bulkAction.editData.length - 1){
          this.loadData();
        }
      });
      this.setState({tableIsLoading : false});


    });
    searchReimbursementsByUser(e: any){
      e.stopPropagation();
    }

    renderPopover(rowData : any,type : string){
      return(
        <>
            <OverlayTrigger trigger="hover" placement="right-start"  delay={{ show: 300, hide: 300 }}
                            overlay={
            <Popover id={`popover-${type}- ${rowData[type].userId}`}
                  title={rowData[type].firstName + ' ' + rowData[type].lastName}>
                <p><i>Email</i>: {rowData[type].email}</p>
                <p><i>Role</i> : {Format.uppercaseFirstLetter(rowData[type].role.role)}</p>
              </Popover>}>
              <a className = "username-link" onClick = {this.searchReimbursementsByUser}>{rowData[type].userName}</a>

            </OverlayTrigger>
        </>
      )
    }
    renderRealDate(rowData : any, type : string){
      return (
      <>
          <OverlayTrigger trigger="hover" placement="right"  delay={{ show: 300, hide: 300 }}
                            overlay={
            <Tooltip id={'popover-' + type + '-' + rowData[type]}>
            {Format.convertTimestampToDate(rowData[type])}</Tooltip>
                  }>
              <a className = "username-link">{Format.readableTimestampSubtract(rowData[type])}</a>
            </OverlayTrigger>        
      </> )
    }
    render(){
        return (
          <>
          <MaterialTable
     columns={[
         { title: 'ID', field: 'reimbursementId', searchable: false},
         { title: 'Author', field: 'author.userName', render: rowData => 
         this.renderPopover(rowData,'author')
    
        },
         { title: 'Amount', field: 'amount', type: 'currency', searchable: false },
         { title: 'Type', field: 'type.type', type: 'string', searchable: true, render: rowData => 
         Format.uppercaseFirstLetter(rowData.type.type)},

         this.props.status === Status.Pending ? 
         { title: 'Submitted', field: 'dateSubmitted', defaultSort: 'asc', searchable: false, render: rowData =>
            this.renderRealDate(rowData, 'dateSubmitted')} :
          { title: 'Submitted', field: 'dateSubmitted', searchable: false, render: rowData =>
            this.renderRealDate(rowData, 'dateSubmitted')},
          this.props.status !== Status.Pending ?
         { title: 'Resolved', field: 'dateResolved', searchable: false, defaultSort: 'desc', render: rowData =>
            this.renderRealDate(rowData, 'dateResolved') } : {hidden: true},
        this.props.status !== Status.Pending ?
         {title: 'Resolver', field: 'resolver.userName' , render: rowData => 
          this.renderPopover(rowData,'resolver')
        } : {hidden:true},
     ]}
     data={this.state.data}
     localization = {{toolbar: {searchPlaceholder: "Search by name or type"}}}
     title={`${this.props.status} Reimbursements`}
     options={this.props.status === Status.Pending ?{
         selection: true,
         detailPanelType: 'single',
         detailPanelColumnAlignment: 'right',
         searchFieldAlignment: 'right',
         exportButton: true,
       } : {
         exportButton: true,
         detailPanelColumnAlignment: 'right',
         searchFieldAlignment: 'right',
       }}
       actions={this.props.status === Status.Pending ?[
         {
           tooltip: 'Approve All',
           icon: 'check',
           iconProps: {
               color: 'primary',
               fontSize: 'large'
           },
           onClick: (evt, data) => this.setState({bulkAction: 
            {...this.state.bulkAction, currentAction: 'approved', editData: data, isConfirmed: false }})
         },
         {
             tooltip: 'Deny All',
             icon: 'block',
             iconProps: {
                 color: 'error',
                 fontSize: 'large'
             },
             onClick: (evt, data) => this.setState({bulkAction: 
              {...this.state.bulkAction, currentAction: 'denied', editData: data, isConfirmed: false }})
           }
       ] : []}
     detailPanel={[
             {
              tooltip: 'Edit',
              icon: 'edit',
              openIcon: 'edit',
              render: rowData => {
                return (
                  <>
                    {rowData ?<ReimbursementEditModal editData
      = {new ReimbursementData(false, rowData)} updateCallback = {this.editModalClose} /> : null}
      </>
                )
              },
            },
            {
              tooltip: 'Display Description',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      color: 'black',
                      backgroundColor: '',
                      margin: 'auto',
                    }}
                  ><h3>Comments:</h3>
                    <p style = {{fontSize: '16px'}}>{rowData.description}</p>
                  </div>
                )
              },
            },
     ]}
     isLoading = {this.state.tableIsLoading}
      />
            {this.state.bulkAction.isConfirmed ? null : 
              <ConfirmationModal message = "perform this bulk action" updateCallback = {this.bulkActionHandler}/>}
            {this.state.Error.isError ? 
              <ErrorModal isCloseable={true} updateCallback = {this.errorModalClose} errorMessage = {this.state.Error.message} ></ErrorModal> : null
            }
          </>
        );
    }
}