import React, { Component } from "react";

class TitleList extends Component {
  constructor(props) {
    super(props);
  }

  addTitle = () => {
    var eventVar = () => {
      if (window.event.keyCode === 13) {
        document.activeElement.blur();
      }
    };
    var setNewTitleFunc = () => {
      const { titleList } = this.props;

      let newTitle = document.getElementById("inputTitleTag").value;
      if (titleList.includes(newTitle)) {
        document.getElementById("noticeArea").innerHTML =
          "Already exists this Title.. ";
      } else if (newTitle !== "") {
        this.props.onAddTitle(newTitle);
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
    input.onblur = setNewTitleFunc;
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
    const { titleList } = this.props;
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
          {titleList.map(title => (
            <div
              key={title}
              className="TitleEntry"
              onClick={this.onClickTitle(title)}
              style={title === this.props.selectTitle ? selectTitleStyle : {}}
            >
              {title}
            </div>
          ))}
          <div className="newinputArea"></div>
          <div id="noticeArea" style={noticeAreaStyle}></div>
        </div>
        <div className="footer">
          <button onClick={this.addTitle} style={buttonStyle}>
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
