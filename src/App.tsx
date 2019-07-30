import React, {Component} from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/Content';
import './App.css';
import {HashRouter } from 'react-router-dom';
import store from './Store';
import { Provider } from 'react-redux';
class App extends Component<{}> {
  
  public render() {
    return (
      <Provider store={store}>
      <HashRouter>
        <div className = 'app-container'>
          <Sidebar startVisible = {true}/>
          <Content></Content>
        </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;