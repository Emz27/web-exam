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

const ExamInfo = (props)=>{
  const items = props.parent.state.student_present_exams.map((q,index)=>
        (
    <tr key={q.exam_id}>
      <td className={"text-center"}>{index+1}</td>
      <td className={"text-center"}>{q.exam_type_description}</td>
      <td className={"text-center"}>{q.exam_subject_description}</td>
      <td className={"text-center"}>{q.exam_teacher_name}</td>
      <td className={"text-center"}>{moment(props.parent.state.current_time).to(q.exam_date_start)}</td>
      <td className={"text-center"}>{moment(props.parent.state.current_time).to(q.exam_date_end)}</td>
      <td className={"text-center"}>{q.exam_duration+" minutes"}</td>
      <td className={"text-center"}>
        {
          (()=>{
            console.dir(q);
            if(q.exam_questions[0].student_answers.length&& moment(props.parent.state.current_time).diff(q.exam_questions[0].student_answers[0].date_created,"minutes")>q.exam_duration){
              return "Pending"
            }
            else return (<button type="button" className="btn btn-outline-dark" 
                          onClick={(event)=>{
                          }}>
                            Exam
                        </button>)
          })()
        }
      </td>
    </tr>
  ));
  return (
    <div>
      Present Exam
    <table className={"table"}>
      <tr>
        <th className={"text-center"}>#</th>
        <th className={"text-center"}>Exam Type</th>
        <th className={"text-center"}>Subject</th>
        <th className={"text-center"}>Teacher</th>
        <th className={"text-center"}>Date Available</th>
        <th className={"text-center"}>Date Expire</th>
        <th className={"text-center"}>Duration</th>
        <th className={"text-center"}>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}
export {ExamInfo}
