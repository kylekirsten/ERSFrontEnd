import React, {Component, MouseEvent} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import * as APICall from '../../../utils/APICall';
import ErrorModal from '../popup/ErrorModal'
import { ReimbursementData } from '../../../models/ReimbursementData';
import ReimbursementEditModal from '../popup/ReimbursementEditModal';
import * as DateFunctions from '../../../utils/DateFunctions';
interface IProps {
}
interface IState {
    data : object[];
    tableIsLoading : boolean;
    errorModalPlaceholder : any;
    currentReimbursementModal: ReimbursementData;
    currentModalTemplate : any;
    tableStructure : any;
}
export default class ReimbursementsTable extends Component<IProps,IState>{
    state : IState;
    constructor(props : IProps){
        super(props);
        this.state = {
            data : [{}],
            tableIsLoading : true,
            errorModalPlaceholder : '',
            currentReimbursementModal : new ReimbursementData(false, {}),
            currentModalTemplate : null,
            tableStructure: <div></div>,
        }
    }  
    editModalClose = (() => {
      this.state.currentReimbursementModal.toggleOpenState();
      this.setState({...this.state, currentModalTemplate : <></>});

    });
    editModalOpen = ((data : any) => {
      let dataInside = data;
      this.setState({...this.state, currentReimbursementModal : new ReimbursementData(false,dataInside)});
      this.setState({...this.state, currentModalTemplate: <ReimbursementEditModal editData
      = {this.state.currentReimbursementModal} updateCallback = {this.editModalClose} />
        });
      
    })
    errorModalClose = (() => {
      this.setState({...this.state, errorModalPlaceholder: <div></div>})
    });
    showServerError = (message : any) => {
      this.setState({errorModalPlaceholder: 
        <ErrorModal updateCallback = {this.errorModalClose} errorMessage = {message} ></ErrorModal>});
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
          newElement.dateSubmitted = new Date(element.dateSubmitted);
          return await newElement;
        }else{
          newElement.resolver = resolverData;
          newElement.author = authorData;
          newElement.dateSubmitted = DateFunctions.convertTimestampToDate(element.dateSubmitted);

          return await newElement;
          }
      }));
    }
    async loadData() {
        //this.setState({data: [{userName: 'loading'},{userName: 'loading'}]});
        const loadedDataPending = await APICall.GET('/reimbursements/status/pending');
        const loadedDataApproved = await APICall.GET('/reimbursements/status/approved');
        const loadedDataDenied = await APICall.GET('/reimbursements/status/denied');

        //If APICall returns an error, show the error modal.
        if(loadedDataPending instanceof Error || loadedDataApproved instanceof Error || loadedDataDenied instanceof Error){
          this.showServerError(loadedDataApproved.message);
        }else{
          let passedData : any[] = await this.PopulateUserData(loadedDataPending);
          let longerPassedData =  passedData.concat(await this.PopulateUserData(loadedDataApproved));
          let longestPassedData =  longerPassedData.concat(await this.PopulateUserData(loadedDataDenied));
          this.setState({data : longestPassedData
            , tableIsLoading : false});   
        }
    }
    componentDidMount(){
        this.loadData();
        //setTimeout( () => {
        //  this.setState({...this.state,data: [{}]})
        //},5000)
    }
    render(){
      if(!this.state.errorModalPlaceholder){
        return (
          <>
          <MaterialTable
     columns={[
         { title: 'ID', field: 'reimbursementId' },
         { title: 'Author', field: 'author.userName' },
         { title: 'Amount', field: 'amount', type: 'currency' },
         { title: 'Date', field: 'dateSubmitted', type: 'date'},
         { title: 'Resolver', field: 'resolver.userName'},
         { title: 'Status', field: 'status.status' }
     ]}
     data={this.state.data}
     title="Reimbursements"
     options={{
         selection: true,
         detailPanelType: 'single',
         detailPanelColumnAlignment: 'right',
         searchFieldAlignment: 'right',
         exportButton: true,
       }}
       onRowClick={(event, rowData, togglePanel) => {console.log(rowData);
         this.editModalOpen(rowData);}}
       actions={[
         {
           tooltip: 'Approve All',
           icon: 'check',
           iconProps: {
               color: 'primary',
               fontSize: 'large'
           },
           onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
         },
         {
             tooltip: 'Deny All',
             icon: 'block',
             iconProps: {
                 color: 'error',
                 fontSize: 'large'
             },
             onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
           }
       ]}
     detailPanel={[
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
                     }}
                   >
                     {rowData.description}
                   </div>
                 )
               },
             },
     ]}
     isLoading = {this.state.tableIsLoading}
      />
            {this.state.currentModalTemplate}
          </>
        );
     } else {
       return (
         this.state.errorModalPlaceholder
       )
     }
    }
}