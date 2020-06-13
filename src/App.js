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
    const { titleList, todoItems } = this.state;
    return (
      <div className="App">
        <div className="TitleListArea">
          <TitleList
            todoItems={todoItems}
            onAddTodoItem={this.onAddTodoItem}
            onAddTitle={this.onAddTitle}
            selectedTitle={this.state.selectedTitle}
            changeTitle={this.changeTitle}
            changeSearchKeyword={this.changeSearchKeyword}
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
  onAddTodoItem = newTitle => {
    this.setState({
      todoItems: [...this.state.todoItems, { title: newTitle }],
      selectedTitle: newTitle,
    });
  };
}

export default App;
