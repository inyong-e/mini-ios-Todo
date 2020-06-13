import React, { Component } from "react";
import TitleList from "./component/TitleList";
import TodoList from "./component/TodoList";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      selectedTitle: "",
      searchKeyword: "",
    };
  }

  render() {
    const { todoItems, searchKeyword } = this.state;
    return (
      <div className="App">
        <div className="TitleListArea">
          <TitleList
            todoItems={todoItems}
            onAddTodoItem={this.onAddTodoItem}
            onClickTitle={this.onClickTitle}
            searchKeyword={searchKeyword}
            selectedTitle={this.state.selectedTitle}
            changeSearchKeyword={this.changeSearchKeyword}
          />
        </div>

        <div className="TodoListArea">
          <TodoList
            selectTitle={this.state.selectTitle}
            searchKeyword={this.state.searchKeyword}
          />
        </div>
      </div>
    );
  }

  changeSearchKeyword = keyword => {
    this.setState({
      searchKeyword: keyword,
    });
  };

  onClickTitle = selectedTitle => () => {
    this.setState({
      selectedTitle,
    });
  };

  onAddTodoItem = newTitle => {
    this.setState({
      todoItems: [...this.state.todoItems, { title: newTitle }],
      selectedTitle: newTitle,
    });
  };
}

export default App;
