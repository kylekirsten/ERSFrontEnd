import React, {Component} from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/Content';
import './App.css';
import store from './Store';
import {HashRouter } from 'react-router-dom';
import {loginSuccessful, toggleAuthStatus, } from './actions/Authentication.action';
interface IState {
}
class App extends Component<IState> {
  state : IState = {
  }
  public render() {

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))
let storeState = store.getState();
// Dispatch some actions
store.dispatch(loginSuccessful('Learn about actions'))
store.dispatch(toggleAuthStatus());

// Stop listening to state updates
unsubscribe()
    return (
      <HashRouter>
        <div className = 'app-container'>
          <Sidebar startVisible = {true}/>
          <Content/>
        </div>
      </HashRouter>
    );
  }
}

export default App;