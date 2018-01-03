import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {QuestionContainer} from './../question/QuestionContainer.jsx'
import {ExamAddEdit} from './ExamAddEdit.jsx'
import {ExamTable} from './ExamTable.jsx'
import {ExamQuestion} from './ExamQuestion.jsx'


const ExamContainer = (props)=>{
  var question_state_type = props.parent.state.question_state_type;
  var exam_state_type = props.parent.state.question_exam_type;
  if(props.parent.state.exam_state_type == "Add" || props.parent.state.exam_state_type == "Update"){
    return (
        <div>
          <div>
            <ExamAddEdit parent={props.parent} />
            <ExamQuestion parent={props.parent} />
          </div>
          <div>
            <QuestionContainer parent={props.parent} />
          </div>
        </div>
    )
  }
  else {
    return (
      <div>
        <ExamTable parent={props.parent} />
      </div>
    )
  }
}


export {ExamContainer}
