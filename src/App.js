import React, { Component } from "react";
import TitleList from "./component/TitleList";
import TodoList from "./component/TodoList";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleList: [],
      selectTitle: "",
      searchKeyword: "",
    };
  }

  changeTitle = name => {
    this.setState({
      selectTitle: name,
    });
  };
  changeSearchKeyword = keyword => {
    this.setState({
      searchKeyword: keyword,
    });
  };
  render() {
    const { titleList } = this.state;
    return (
      <div className="App">
        <div className="TitleListArea">
          <TitleList
            onAddTitle={this.onAddTitle}
            titleList={titleList}
            changeTitle={this.changeTitle}
            changeSearchKeyword={this.changeSearchKeyword}
            selectTitle={this.state.selectTitle}
          />
        </div>

        <div className="TodoListArea">
          <TodoList
            selectTitle={this.state.selectTitle}
            searchKeyword={this.state.searchKeyword}
            changeTitle={this.changeTitle}
          />
        </div>
      </div>
    );
  }
  onAddTitle = newTitle => {
    this.setState({
      titleList: [...this.state.titleList, newTitle],
      selectTitle: newTitle,
    });
  };
}

export default App;
