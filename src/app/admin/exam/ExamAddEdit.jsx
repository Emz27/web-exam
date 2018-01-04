import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'
import {fetchQuestion} from './../fetch.jsx'

const ExamAddEdit =(props)=>(

<div>
  <form onSubmit={(event)=>{props.parent.handleExamSubmitButton(event);}}>
    <div>
      <label>
        Subject
        {(()=>{
            if(props.parent.state.exam_state_type=="Add"){
              return (
                <select value={props.parent.state.exam_teacher_subject_id}
                  onChange={(event)=>{
                    console.log("teacher_id exams : "+props.parent.state.exam_teacher_subject_id);
                    console.log("select value: "+event.target.value);
                    props.parent.handleInputChange({
                      exam_teacher_subject_id: event.target.value,
                      exam_questions:[]
                    })

                  }}>
                  <option value="" disabled></option>
                  {props.parent.state.available_subjects.map((q,i)=><option key={q.teacher_subject_id} value={q.teacher_subject_id}>{q.subject_description+" - "+q.teacher_name}</option>)}
                </select>
              )
            }
            else return (<div>{props.parent.state.subject_description+" - "+props.parent.state.teacher_name}</div>)
        })()}
      </label>
    </div>
    <div>
      <label>
        Exam Type
        {(()=>{
        return (
          <select value={props.parent.state.exam_type_id} onChange={(event)=>{props.parent.handleInputChange({exam_type_id: event.target.value})}}>
            <option value="" disabled></option>
            {props.parent.state.exam_types.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
          </select>
        )
        })()}
      </label>
    </div>

    <div>
      {
        (()=>{
          if(!props.parent.state.date_start){
            props.parent.setState({date_start: moment(props.parent.state.current_time).format("YYYY-MM-DDTHH:mm")})
          }
        })()
      }
      <label>Available Date</label>
      <input type="datetime-local" value={moment(props.parent.state.date_start).format("YYYY-MM-DDTHH:mm")}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({date_start: event.target.value})}}
        min={moment(props.parent.state.current_time).subtract(1,"month").format("YYYY-MM-DDTHH:mm")}
        max={(props.parent.state.date_end)?moment(props.parent.state.date_end).format("YYYY-MM-DDTHH:mm"):moment(props.parent.state.current_time).add(6,"month").format("YYYY-MM-DDTHH:mm")}
        required
      />
    </div>
    <div>
      {
        (()=>{
          if(!props.parent.state.date_end){
            props.parent.setState({date_end: moment(props.parent.state.current_time).add(1,"month").format("YYYY-MM-DDTHH:mm")})
          }
        })()
      }
      <label>Expiry Date</label>
      <input type="datetime-local" value={moment(props.parent.state.date_end).format("YYYY-MM-DDTHH:mm")}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({date_end: event.target.value})}}
        min={(props.parent.state.date_start)?moment(props.parent.state.date_start).format("YYYY-MM-DDTHH:mm"):moment(props.parent.state.current_time).subtract(3,"month").format("YYYY-MM-DDTHH:mm")}
        max={moment(props.parent.state.current_time).add(3,"month").format("YYYY-MM-DDTHH:mm")}
        required
      />
    </div>
    <div>
      <label>Duration (in minutes) </label>
      {()=>{
          if(!props.parent.state.duration)props.parent.handleInputChange({duration: 5});
        }}
      <input type="number" value={props.parent.state.duration}
        onChange={(event)=>{
          if(event.target.value >0)props.parent.handleInputChange({duration: event.target.value})
        }}
        min={5}
        max={120}
        required
      />
    </div>
    <button onClick={(event)=>{props.parent.handleExamCancelButton(event);}}>
        Cancel
    </button>
    <button type="submit">
        Submit Exam
    </button>
  </form>
</div>
)

export {ExamAddEdit}
