import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {QuestionAddEdit} from './QuestionAddEdit.jsx'
import {QuestionTable} from './QuestionTable.jsx'


const QuestionContainer = (props)=>{
  if(props.parent.state.question_state_type == "Add" || props.parent.state.question_state_type == "Update"){
    return (
      <QuestionAddEdit parent={props.parent} />
    )
  }
  else {
    return (
      <div>
      <button
        onClick={(event)=>{
          props.parent.handleQuestionAddButton();
        }}
        >
          Add
      </button>
      <QuestionTable match={{ params: { id: 0 }, url: '/admin' }} parent={props.parent} />
      </div>
    )
  }
}


export {QuestionContainer}
