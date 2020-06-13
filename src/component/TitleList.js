import React, { useState } from "react";

const TitleList = props => {
  const {
    todoItems,
    selectedTitle,
    onClickTitle,
    searchKeyword,
    changeSearchKeyword,
  } = props;

  const [isShowNotice, setIsShowNotice] = useState(false);
  const [isShowInputTitle, setIsShowInputTitle] = useState(false);

  const clearText = () => {
    setIsShowNotice(false);
    document.getElementById("searchInputBox").value = "";
  };

  const onEventKey = () => {
    if (window.event.keyCode === 13) {
      document.activeElement.blur();
    }
  };

  const onClickAddBtn = e => {
    const { todoItems, onAddTodoItem } = props;
    const newTitle = e.currentTarget.value;

    const isEmpty = newTitle === "";
    const isExistTitle =
      todoItems.findIndex(todoItem => todoItem.title === newTitle) >= 0;

    if (!isExistTitle && !isEmpty) {
      onAddTodoItem(newTitle);
    }
    setIsShowInputTitle(false);
    setIsShowNotice(isExistTitle);
  };

  const onClickAddListBtn = async () => {
    await setIsShowInputTitle(true);
    await setIsShowNotice(false);

    document.getElementById("input-title-box").focus();
  };
  return (
    <div>
      <header>
        <input
          type="text"
          id="searchInputBox"
          placeholder="검색"
          onClick={clearText}
          value={searchKeyword}
          onChange={changeSearchKeyword}
        />
      </header>
      iCloud
      <div className="ListArea">
        {todoItems.map(todoItem => (
          <div
            key={todoItem.title}
            className="TitleEntry"
            onClick={onClickTitle(todoItem.title)}
            style={{
              backgroundColor:
                todoItem.title === selectedTitle
                  ? "rgb(167,167,167)"
                  : "initial",
            }}
          >
            {todoItem.title}
          </div>
        ))}
        {isShowInputTitle && (
          <input
            id="input-title-box"
            placeholder="새로운 목록"
            onKeyUp={onEventKey}
            onBlur={onClickAddBtn}
          />
        )}
        {isShowNotice && (
          <div
            style={{
              color: "rgb(190,48,27)",
              fontSize: "15px",
            }}
          >
            Already exists this Title..
          </div>
        )}
      </div>
      <div className="footer">
        <button
          onClick={onClickAddListBtn}
          style={{
            fontSize: "12px",
            width: "240px",
          }}
        >
          +add List
        </button>
      </div>
    </div>
  );
};

export default TitleList;
