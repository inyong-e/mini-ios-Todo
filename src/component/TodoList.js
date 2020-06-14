import React from "react";
import SearchView from "./SearchView";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      currentTodo: null,
    };
  }
  addTodoEntry = () => {
    if (this.props.selectTitle === "") {
      alert("select Title!");
      return;
    }
    var eventVar = () => {
      if (window.event.keyCode === 13) {
        document.activeElement.blur();
      }
    };
    var setNewTitleFunc = () => {
      let inputVal = document.getElementById("inputTodoTag").value;
      if (inputVal !== "") {
        this.setState({
          todoList: [
            ...this.state.todoList,
            { title: this.props.selectTitle, memo: inputVal, complete: false },
          ],
        });
      }
      document.getElementById("inputTodoTag").remove();
    };
    var input = document.createElement("input");
    input.id = "inputTodoTag";
    input.onkeyup = eventVar;
    input.placeholder = "할 일을 입력하세요.";
    input.onblur = setNewTitleFunc;
    document.querySelector(".inputTodoArea").appendChild(input);
    input.focus();
  };
  removeTodoEntry = () => {
    let { todoList, currentTodo } = this.state;
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].memo === currentTodo) {
        todoList.splice(i, 1);

        this.setState({
          todoList: todoList,
          currentTodo: null,
        });
        return;
      }
    }
  };
  changeCheck = memo => {
    let list = this.state.todoList.slice();

    for (var i = 0; i < list.length; i++) {
      if (list[i].memo === memo) list[i].complete = !list[i].complete;
    }

    this.setState({
      todoList: list,
    });
  };
  selectTodo = (memo, title, flag) => {
    this.setState({
      currentTodo: memo,
    });
    if (flag === "searchClick") {
      this.props.changeTitle(title);
    }
  };
  render() {
    const float = {
      float: "left",
    };
    const filterSearchList = this.state.todoList.filter(element => {
      return element.memo.indexOf(this.props.searchKeyword) !== -1;
    });

    const selectTitleStyle = {
      backgroundColor: "rgb(167,167,167)",
    };
    if (this.props.searchKeyword === "") {
      return (
        <div>
          <header>
            <button onClick={this.addTodoEntry} style={float}>
              +
            </button>
            <button onClick={this.removeTodoEntry} style={float}>
              -
            </button>
            <div>{this.props.selectTitle}</div>
          </header>
          <br />
          <div>
            {this.state.todoList.map((element, index) => {
              if (
                this.props.selectTitle === element.title &&
                element.complete === false
              )
                return (
                  <div
                    style={
                      this.state.currentTodo === element.memo
                        ? selectTitleStyle
                        : {}
                    }
                    className="todoEntry"
                    onClick={() => {
                      this.selectTodo(element.memo);
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={element.complete}
                      onChange={() => {
                        this.changeCheck(element.memo);
                      }}
                    />{" "}
                    {element.memo}
                  </div>
                );
            })}
            <div className="inputTodoArea"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <header>
            <div>
              '{this.props.searchKeyword}' (으)로 검색한 결과 -{" "}
              {filterSearchList.length === 0
                ? "없음"
                : filterSearchList.length + " 개"}
            </div>
          </header>
          <div>
            <SearchView
              searchList={filterSearchList}
              changeCheck={this.changeCheck}
              currentTodo={this.state.currentTodo}
              selectTodo={this.selectTodo}
            />
          </div>
        </div>
      );
    }
  }
}

export default TodoList;
