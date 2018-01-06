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
                    console.log("option desc: "+ event.target.options[event.target.selectedIndex].text)
                    var selectedOption = event.target.options[event.target.selectedIndex];
                    props.parent.handleInputChange({
                      exam_teacher_subject_id: event.target.value,
                      question_subject_description: selectedOption.text.slice(0,selectedOption.text.indexOf(" - ")),
                      question_teacher_name: selectedOption.text.slice(selectedOption.text.indexOf(" - ")),
                      exam_questions:[]
                    })

                  }}>
                  <option value="" disabled></option>
                  {props.parent.state.available_subjects.map((q,i)=><option key={q.teacher_subject_id} value={q.teacher_subject_id}>{q.subject_description+" - "+q.teacher_name}</option>)}
                </select>
              )
            }
            else return (<div>{props.parent.state.exam_subject_description+" - "+props.parent.state.exam_teacher_name}</div>)
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
          if(!props.parent.state.exam_date_start){
            props.parent.setState({exam_date_start: moment(props.parent.state.current_time).format("YYYY-MM-DDTHH:mm")})
          }
        })()
      }
      <label>Available Date</label>
      <input type="datetime-local" value={moment(props.parent.state.exam_date_start).format("YYYY-MM-DDTHH:mm")}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({exam_date_start: event.target.value})}}
        min={moment(props.parent.state.current_time).subtract(1,"month").format("YYYY-MM-DDTHH:mm")}
        max={(props.parent.state.exam_date_end)?moment(props.parent.state.exam_date_end).format("YYYY-MM-DDTHH:mm"):moment(props.parent.state.current_time).add(6,"month").format("YYYY-MM-DDTHH:mm")}
        required
      />
    </div>
    <div>
      {
        (()=>{
          if(!props.parent.state.exam_date_end){
            props.parent.setState({exam_date_end: moment(props.parent.state.current_time).add(1,"month").format("YYYY-MM-DDTHH:mm")})
          }
        })()
      }
      <label>Expiry Date</label>
      <input type="datetime-local" value={moment(props.parent.state.exam_date_end).format("YYYY-MM-DDTHH:mm")}
        onChange={(event)=>{console.log(event.target.value);props.parent.handleInputChange({exam_date_end: event.target.value})}}
        min={(props.parent.state.exam_date_start)?moment(props.parent.state.exam_date_start).format("YYYY-MM-DDTHH:mm"):moment(props.parent.state.current_time).subtract(3,"month").format("YYYY-MM-DDTHH:mm")}
        max={moment(props.parent.state.current_time).add(3,"month").format("YYYY-MM-DDTHH:mm")}
        required
      />
    </div>
    <div>
      <label>exam_duration (in minutes) </label>
      {()=>{
          if(!props.parent.state.exam_duration)props.parent.handleInputChange({exam_duration: 5});
        }}
      <input type="number" value={props.parent.state.exam_duration}
        onChange={(event)=>{
          if(event.target.value >0)props.parent.handleInputChange({exam_duration: event.target.value})
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
