import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'
import {QuestionList} from './QuestionList.jsx'
import {Timer} from './Timer.jsx'

const ExamInfo = (props)=>{
  console.dir(props)
  const present_exam = props.parent.state.student_present_exams.find(e => e.exam_id == props.parent.props.match.params.exam_id);

  var start_time = "";
  var duration = "";
  if(present_exam && present_exam.exam_questions[0]&&present_exam.exam_questions[0].student_answers[0]
    &&present_exam.exam_questions[0].student_answers[0].date_created){
    start_time = present_exam.exam_questions[0].student_answers[0].date_created
    duration = present_exam.exam_duration;
  }

  return (
    <div>
      Remaining Minutes: <Timer start_time={start_time} duration={duration} />
      <br/>
      <br/>
      <Link to={"/student/profile"}><button>Done</button></Link>
    </div>
  )
}
export {ExamInfo}
