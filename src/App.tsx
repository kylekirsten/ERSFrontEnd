import React, {Component} from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/Content';
import './App.css';
import {HashRouter } from 'react-router-dom';
interface IState {
}
class App extends Component<IState> {
  state : IState = {
  }
  public render() {
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