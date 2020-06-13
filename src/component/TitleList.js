import React, { Component } from "react";

class TitleList extends Component {
  constructor(props) {
    super(props);
  }

  onAddButton = () => {
    var eventVar = () => {
      if (window.event.keyCode === 13) {
        document.activeElement.blur();
      }
    };
    var onClickAddBtn = () => {
      const { todoItems } = this.props;

      let newTitle = document.getElementById("inputTitleTag").value;
      const isExistTitle =
        todoItems.findIndex(todoItem => todoItem.title === newTitle) >= 0;
      if (isExistTitle) {
        document.getElementById("noticeArea").innerHTML =
          "Already exists this Title.. ";
      } else if (newTitle !== "") {
        this.props.onAddTodoItem(newTitle);
      }
      document.getElementById("inputTitleTag").remove();
    };

    document.getElementById("noticeArea").innerHTML = "";
    document.getElementById("searchInputBox").value = "";
    this.props.changeSearchKeyword("");
    var input = document.createElement("input");
    input.id = "inputTitleTag";
    input.onkeyup = eventVar;
    input.placeholder = "새로운 목록";
    input.onblur = onClickAddBtn;
    document.querySelector(".newinputArea").appendChild(input);
    input.focus();
  };
  selectTitleFunc = title => {
    this.clrearNoticeMessage();
    this.props.changeTitle(title);
  };
  clrearNoticeMessage = () => {
    document.getElementById("noticeArea").innerHTML = "";
    document.getElementById("searchInputBox").value = "";
  };
  render() {
    const buttonStyle = {
      fontSize: "12px",
      width: "280px",
    };
    const selectTitleStyle = {
      backgroundColor: "rgb(167,167,167)",
    };
    const noticeAreaStyle = {
      color: "rgb(190,48,27)",
      fontSize: "15px",
    };
    const { todoItems, selectedTitle } = this.props;
    console.log(this.props.selectedTitle);
    return (
      <div>
        <header>
          <input
            type="text"
            id="searchInputBox"
            placeholder="검색"
            onClick={this.clrearNoticeMessage}
            onChange={e => {
              this.props.changeSearchKeyword(e.target.value);
            }}
          />
        </header>
        iCloud
        <div className="ListArea">
          {todoItems.map(todoItem => (
            <div
              key={todoItem.title}
              className="TitleEntry"
              onClick={this.onClickTitle(todoItem.title)}
              style={todoItem.title === selectedTitle ? selectTitleStyle : {}}
            >
              {todoItem.title}
            </div>
          ))}
          <div className="newinputArea"></div>
          <div id="noticeArea" style={noticeAreaStyle}></div>
        </div>
        <div className="footer">
          <button onClick={this.onAddButton} style={buttonStyle}>
            +add List
          </button>
        </div>
      </div>
    );
  }
  onClickTitle = title => () => {
    this.props.changeTitle(title);
  };
}

export default TitleList;
