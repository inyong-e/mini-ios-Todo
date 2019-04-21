import React, { Component } from 'react';
import TitleList from './component/TitleList';
import TodoList from './component/TodoList';
import './css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTitle : '',
      searchKeyword : ''
    }
    
  }
  changeTitle = (name) => {
    this.setState({
      currentTitle : name
    })
  }
  changeSearchKeyword = (keyword) => {
    this.setState({
      searchKeyword: keyword
    })
  }
  render() {
    return (
      <div className="App">
        <div className='TitleListArea'><TitleList changeTitle = {this.changeTitle} changeSearchKeyword = {this.changeSearchKeyword} currentTitle = {this.state.currentTitle} /></div>
        
        <div className='TodoListArea'><TodoList currentTitle={this.state.currentTitle} searchKeyword = {this.state.searchKeyword} changeTitle={this.changeTitle}/></div>
      </div>
    );
  }
}

export default App;
