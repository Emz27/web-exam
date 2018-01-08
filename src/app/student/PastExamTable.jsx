import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'

const PastExamTable = (props)=>{
  const items = props.parent.state.student_past_exams.map((q,index)=>
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
          var answered_items=0;
          q.exam_questions.forEach((item,index)=>{
            console.log("items: "+total_items);

            if(item.question_type_description == "Enumeration"){
              total_items += item.question_options.length*(+item.question_point)
            }
            else {
              total_items += (+item.question_point);
            }
            item.student_answers.forEach((itm,i)=>{
              if(itm.answer != "") answered_items+=1;
            })
          })
          return (answered_items+"/"+total_items);
        })()

      }</td>
      <td>{
        (()=>{
          var score =0;
          var total =0;
          q.exam_questions.forEach((item,index)=>{
            if(item.question_type_description == "Enumeration"){
              total += item.question_options.length*(+item.question_point)
            }
            else {
              total += (+item.question_point);
            }
            item.student_answers.forEach((itm,i)=>{
              if(itm.student_answer_is_correct == "1") score+= +item.question_point
            })
          })
          return (score+"/"+total);
        })()

      }</td>
      <td>
        <button
          onClick={(event)=>{
          }}
          >
            View
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      Past Exam
    <table>
      <tr>
        <th>#</th>
        <th>Exam Type</th>
        <th>Subject</th>
        <th>Teacher</th>
        <th>Date Available</th>
        <th>Date Expire</th>
        <th>Duration</th>
        <th>Answered Items</th>
        <th>Score</th>
        <th>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {PastExamTable}
