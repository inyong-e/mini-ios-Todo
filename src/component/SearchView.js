import React from 'react';

const SearchView = (props) => {
  var TitleList = [];

  for(var list of props.searchList){
    if(!TitleList.includes(list.title)) TitleList.push(list.title);
  }
  const selectTitleStyle = {
    backgroundColor : 'rgb(167,167,167)'
  }

  return (
    <div>
      {
        TitleList.map(titleElement =>( 
          <div>
            <h3>{titleElement}</h3> 
            {props.searchList.map(element => {
              if(element.title === titleElement){
                return <div className='todoEntry' onClick={()=>{props.selectTodo(element.memo, element.title,'searchClick')}} style={props.currentTodo === element.memo ? selectTitleStyle : {}}><input type="checkbox" defaultChecked={element.complete} onChange={()=>{props.changeCheck(element.memo)}} /> {element.memo}</div>
              }
            })}
            
          </div>
        ))
        }
    </div>
  )
}

export default SearchView;