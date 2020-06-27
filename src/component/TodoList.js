import React, { useState } from "react";
import SearchView from "./SearchView";

const TodoList = props => {
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(-1);
  const onClickEntry = index => () => setSelectedEntryIndex(index);
  const deleteTodyEntry = () => {
    const filteredTodoItems = props.todoItems.map(todoItem =>
      todoItem.selectTitle === props.selectTitle
        ? {
            ...todoItem,
            entries: todoItem.entries.filter(
              (entry, index) => index !== selectedEntryIndex,
            ),
          }
        : todoItem,
    );
    props.setNewTodoEntry(filteredTodoItems);
  };
  const addTodoEntry = () => {
    if (props.selectTitle === "") {
      alert("select Title!");
      return;
    }
    const eventVar = () => {
      if (window.event.keyCode === 13) {
        document.activeElement.blur();
      }
    };
    const setNewTitleFunc = () => {
      let inputVal = document.getElementById("inputTodoTag").value;
      if (inputVal !== "") {
        const updatedTodoItems = props.todoItems.map(todoItem =>
          todoItem.title === props.selectedTitle
            ? {
                ...todoItem,
                entries: todoItem.entries
                  ? [...todoItem.entries, { memo: inputVal, complete: false }]
                  : [{ memo: inputVal, complete: false }],
              }
            : todoItem,
        );

        props.setNewTodoEntry(updatedTodoItems);
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

  if (props.searchKeyword === "") {
    const selectedTodoItems = props.todoItems.find(
      todoItem => todoItem.title === props.selectedTitle,
    );
    return (
      <div>
        <header>
          <button onClick={addTodoEntry}>+</button>
          <button onClick={deleteTodyEntry}>-</button>
          <div>{props.selectedTitle}</div>
        </header>
        <br />
        <div>
          {selectedTodoItems &&
            selectedTodoItems.entries &&
            selectedTodoItems.entries.map((entry, index) => (
              <div
                className={`todoEntry ${
                  selectedEntryIndex === index ? "selected" : ""
                }`}
                onClick={onClickEntry(index)}
              >
                <input type="checkbox" defaultChecked={entry.complete} />{" "}
                {entry.memo}
              </div>
            ))}
          <div className="inputTodoArea"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <header>
          <div>'{props.searchKeyword}' (으)로 검색한 결과 - </div>
        </header>
        <div>
          {/* <SearchView
            searchList={filterSearchList}
            
            currentTodo={this.state.currentTodo}
          /> */}
        </div>
      </div>
    );
  }
};
export default TodoList;
