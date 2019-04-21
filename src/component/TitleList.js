import React, {Component} from 'react';

class TitleList extends Component{
  constructor(props){
    super(props);
    this.state = {
      TitleList : []
    }
  }

  addTitle = () => {

    var eventVar = ()=>{
      if(window.event.keyCode === 13){
        document.activeElement.blur();
      }
    }
    var setNewTitleFunc = () => {
      let newTitleName = document.getElementById('inputTitleTag').value;
      if(this.state.TitleList.includes(newTitleName)){
        document.getElementById('noticeArea').innerHTML = 'Already exists this Title.. ';

      }else if(newTitleName !== ''){
        this.setState({
          TitleList: [...this.state.TitleList, newTitleName],
        })
        this.props.changeTitle(newTitleName);
      }
      document.getElementById('inputTitleTag').remove();
    }

    document.getElementById('noticeArea').innerHTML = '';
    document.getElementById('searchInputBox').value = '';
    this.props.changeSearchKeyword('');
    var input = document.createElement('input');
    input.id = 'inputTitleTag';
    input.onkeyup = eventVar;
    input.placeholder = '새로운 목록'
    input.onblur= setNewTitleFunc;
    document.querySelector('.newinputArea').appendChild(input);
    input.focus();
    
  }
  selectTitleFunc = (title) => {
    
    this.clrearNoticeMessage();
    this.props.changeTitle(title);
  }
  clrearNoticeMessage = () => {
    document.getElementById('noticeArea').innerHTML='';
    document.getElementById('searchInputBox').value = '';
  }
  render(){

    const buttonStyle = {
      fontSize : '12px',
      width: '280px'
    } 
    const selectTitleStyle = {
      backgroundColor : 'rgb(167,167,167)'
    }
    const noticeAreaStyle = {
      color : 'rgb(190,48,27)',
      fontSize : '15px'
    }
    return(
      <div>
        <header>
          <input type ='text' id='searchInputBox' placeholder='검색' onClick={this.clrearNoticeMessage} onChange={(e)=>{this.props.changeSearchKeyword(e.target.value)}}/>
        </header>
        iCloud
        
        <div className='ListArea'>
          {this.state.TitleList.map(
            (title,index) => (<div key={index} className='TitleEntry' onClick={()=>{this.selectTitleFunc(title)}} style={title === this.props.currentTitle ? selectTitleStyle : {}}>{title}</div>)
          )}
          <div className='newinputArea'></div>
          <div id='noticeArea' style={noticeAreaStyle}></div>
        </div>
        <div className='footer'>
          <button onClick={this.addTitle} style={buttonStyle}>+add List</button>
        </div>
      </div>
    )
  }
}

export default TitleList;