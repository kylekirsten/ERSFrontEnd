import React, { Component } from "react";
// Import React Table
import ReactTable from "react-table";
import UserEditModal from '../popup/UserEditModal';
import "react-table/react-table.css";
import "./Table.css";
import { UserData } from "../../../models/UserData";
import * as APICall from "../../../utils/APICall";
import ErrorModal from "../popup/ErrorModal";
interface IState {
    data: any[],
    currentEditModal: UserData,
    modalTemplate: any,
    errorModalPlaceholder: any,
}
class UserTable extends Component {
  handleChange = ((event : any) => {
  });
  state : IState = {
      data : [{}],
      currentEditModal: new UserData(false,[]),
      modalTemplate : <div></div>,
      errorModalPlaceholder:null,
  };
  async loadData() {
    this.setState({data: [{userName: 'loading'}]});
    const loadedData = await APICall.GET('/users');
    if(loadedData instanceof Error){
      this.setState({errorModalPlaceholder: 
      <ErrorModal updateCallback = {this.errorModalClose} errorMessage = {loadedData.message} ></ErrorModal>});
    }else{
      const newArr : any = loadedData;
      newArr.forEach((element : any) => {
        newArr[newArr.indexOf(element)].role = element.role.roleType;
      });
      this.setState({data : newArr});
    }
  }
  handleSubmit = ((event : any) => {
    event.preventDefault();
  });
  errorModalClose = ((event: any) => {
    this.setState({...this.state, errorModalPlaceholder: <div></div>})
  });

  handleEditClick = ((e: any) => {
    const values : string[] = Object.values(this.state.data[e.currentTarget.dataset.rowid]);
    const newUserData = new UserData(true, values);
    this.setState({...this.state, currentEditModal : newUserData});
    this.setState({...this.state, modalTemplate: <UserEditModal editData = {newUserData}
                   updateCallback = {this.HandleUpdate}></UserEditModal>});
  });

  HandleUpdate = ((event: any) => {
    this.state.currentEditModal.toggleOpenState();
    
  this.setState({...this.state, modalTemplate : <></>});
  });
  componentDidMount(){
    this.loadData();
  }
  renderEditable = ((cellInfo: any) => {
    return (
      <div
        style={{ backgroundColor: "" }}
        
        suppressContentEditableWarning
        onBlur={e => {
           let row = this.state.data[cellInfo.index];
            row[cellInfo.column.id] = e.target.innerHTML;
                }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  });
  actionButtons = ((cellInfo: any) => {
    return (
      <><div
        style={{ backgroundColor: "" }}
        
        suppressContentEditableWarning
      /><button className='btn btn-primary' data-rowid = {cellInfo.index}
                onClick={this.handleEditClick}>Edit</button>
      <button className='btn btn-secondary'>Delete</button>
      </>
    );
  });

  render() {
    const { data } = this.state;
    if(!this.state.errorModalPlaceholder){
    return (
        <div>
            {this.state.modalTemplate}
          <ReactTable
            data={data}
            columns={[
              {
                Header: "ID",
                accessor: "userId",
              },
              {
                Header: "User Name",
                accessor: "userName",
                Cell: this.renderEditable
              },
              {
                Header: "First Name",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                Cell: this.renderEditable
              },
              {
                Header: "Email",
                accessor: "email",
                Cell: this.renderEditable
              },
              {
                Header: "Role",
                accessor: "role.roleType",
              },
              {
                Header: "Actions",
                accessor: "",
                Cell: this.actionButtons
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
    );
    } else {
      return (
      this.state.errorModalPlaceholder
      );
    }
  }
}
export {UserTable};
