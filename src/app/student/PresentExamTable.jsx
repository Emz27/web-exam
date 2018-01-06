import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'

const PresentExamTable = (props)=>{
  const items = props.parent.state.student_present_exams.map((q,index)=>
        (
    <tr key={q.exam_id}>
      <td>{index+1}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.exam_subject_description}</td>
      <td>{q.exam_teacher_name}</td>
      <td>{moment(props.parent.state.current_time).to(q.exam_date_start)}</td>
      <td>{moment(props.parent.state.current_time).to(q.exam_date_end)}</td>
      <td>{q.exam_duration+" minutes"}</td>
      <td>
        <button
          onClick={(event)=>{
          }}
          >
            Exam
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      Present Exam
    <table>
      <tr>
        <th>#</th>
        <th>Exam Type</th>
        <th>Subject</th>
        <th>Teacher</th>
        <th>Date Available</th>
        <th>Date Expire</th>
        <th>Duration</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {PresentExamTable}
