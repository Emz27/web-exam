import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'

const FutureExamTable = (props)=>{
  const items = props.parent.state.student_future_exams.map((q,index)=>
        (
    <tr key={q.exam_id}>
      <td>{index+1}</td>
      <td>{q.exam_type_description}</td>
      <td>{q.exam_subject_description}</td>
      <td>{q.exam_teacher_name}</td>
      <td>{moment(props.parent.state.current_time).to(q.exam_date_start)}</td>
      <td>{moment(props.parent.state.current_time).to(q.exam_date_end)}</td>
      <td>{q.exam_duration+" minutes"}</td>
      <td>{
        (()=>{
          var total_items=0;
          q.exam_questions.forEach((item,index)=>{
            if(item.question_type_description == "Enumeration"){
              total_items += item.question_options.length*(+item.question_point)
            }
            else {
              total_items += (+item.question_point);
            }
          })
          return (total_items);
        })()

      }</td>
      <td>{
        (()=>{
          var total_score=0;
          q.exam_questions.forEach((item,index)=>{
            if(item.question_type_description == "Enumeration"){
              total_score += item.question_options.length
            }
            else {
              total_score += 1
            }
          })
          return (total_score);
        })()
      }</td>
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
      Future Exam
    <table>
      <tr>
        <th>#</th>
        <th>Exam Type</th>
        <th>Subject</th>
        <th>Teacher</th>
        <th>Date Available</th>
        <th>Date Expire</th>
        <th>Duration</th>
        <th>Items</th>
        <th>Total Score</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {FutureExamTable}
