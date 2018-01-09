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
      <td className={"text-center"}>{index+1}</td>
      <td className={"text-center"}>{q.exam_type_description}</td>
      <td className={"text-center"}>{q.exam_subject_description}</td>
      <td className={"text-center"}>{q.exam_teacher_name}</td>
      <td className={"text-center"}>{moment(props.parent.state.current_time).to(q.exam_date_start)}</td>
      <td className={"text-center"}>{moment(props.parent.state.current_time).to(q.exam_date_end)}</td>
      <td className={"text-center"}>{q.exam_duration+" minutes"}</td>
      <td className={"text-center"}>{
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
      <td className={"text-center"}>{
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
      <td className={"text-center"}>
        <button type="button" className="btn btn-outline-dark" 
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
    <table className={"table"}>
      <tr>
        <th className={"text-center"}>#</th>
        <th className={"text-center"}>Exam Type</th>
        <th className={"text-center"}>Subject</th>
        <th className={"text-center"}>Teacher</th>
        <th className={"text-center"}>Date Available</th>
        <th className={"text-center"}>Date Expire</th>
        <th className={"text-center"}>Duration</th>
        <th className={"text-center"}>Items</th>
        <th className={"text-center"}>Total Score</th>
        <th className={"text-center"}>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {FutureExamTable}
