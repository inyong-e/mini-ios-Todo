import React, { Component } from "react";

class TitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInputTitle: false,
      isShowNotice: false,
    };
  }

  onAddButton = async () => {
    await this.setState({
      isShowInputTitle: true,
      isShowNotice: false,
    });

    this.props.changeSearchKeyword("")();
    document.getElementById("input-title-box").focus();
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
    const {
      todoItems,
      selectedTitle,
      searchKeyword,
      changeSearchKeyword,
    } = this.props;
    const { isShowInputTitle, isShowNotice } = this.state;
    return (
      <div>
        <header>
          <input
            type="text"
            id="searchInputBox"
            placeholder="검색"
            onClick={this.clearText}
            value={searchKeyword}
            onChange={changeSearchKeyword(e.target.value)}
          />
        </header>
        iCloud
        <div className="ListArea">
          {todoItems.map(todoItem => (
            <div
              key={todoItem.title}
              className="TitleEntry"
              onClick={this.props.onClickTitle(todoItem.title)}
              style={todoItem.title === selectedTitle ? selectTitleStyle : {}}
            >
              {todoItem.title}
            </div>
          ))}
          {isShowInputTitle && (
            <input
              id="input-title-box"
              placeholder="새로운 목록"
              onKeyUp={this.onEventKey}
              onBlur={this.onClickAddBtn}
            />
          )}
          {isShowNotice && (
            <div style={noticeAreaStyle}>Already exists this Title..</div>
          )}
        </div>
        <div className="footer">
          <button onClick={this.onAddButton} style={buttonStyle}>
            +add List
          </button>
        </div>
      </div>
    );
  }

  clearText = () => {
    this.setState({
      isShowNotice: false,
    });
    document.getElementById("searchInputBox").value = "";
  };

  onEventKey = () => {
    if (window.event.keyCode === 13) {
      document.activeElement.blur();
    }
  };

  onClickAddBtn = e => {
    const { todoItems } = this.props;
    const newTitle = e.currentTarget.value;

    const isEmpty = newTitle === "";
    const isExistTitle =
      todoItems.findIndex(todoItem => todoItem.title === newTitle) >= 0;

    if (!isExistTitle && !isEmpty) {
      this.props.onAddTodoItem(newTitle);
    }
    this.setState({
      isShowInputTitle: false,
      isShowNotice: isExistTitle,
    });
  };
}

export default TitleList;
