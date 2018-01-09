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
        {
          (()=>{
            console.dir(q);
            var exam_state ="Take Exam"
            if(q.exam_questions[0].student_answers.length&& moment(props.parent.state.current_time).diff(q.exam_questions[0].student_answers[0].date_created,"minutes")>q.exam_duration){
              return "Results Pending"
            }
            else if(q.exam_questions[0].student_answers.length&& moment(props.parent.state.current_time).diff(q.exam_questions[0].student_answers[0].date_created,"minutes")<=q.exam_duration) exam_state = "Review Answers"
            return (<button type="button" className="btn btn-outline-dark" >
                        <Link to={"/student/exam/"+q.exam_id}>{exam_state}</Link>
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
        <th className={"text-center"}>Answered Items</th>
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
export {PresentExamTable}
