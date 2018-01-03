import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {QuestionAddEdit} from './../question/QuestionAddEdit.jsx'
import {QuestionTable} from './../question/QuestionTable.jsx'


const ExamContainer = (props)=>{
  var question_state_type = props.parent.state.question_state_type;
  var exam_state_type = props.parent.state.question_exam_type;
  if(props.parent.state.state_type == "Add" || props.parent.state.state_type == "Update"){
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
      <QuestionTable match={{ params: { id: 0 }, url: '/exam' }} parent={props.parent} />
      </div>
    )
  }
}


export {ExamContainer}
