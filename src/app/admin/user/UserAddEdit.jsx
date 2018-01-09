import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {StudentSubjectSelect} from './StudentSubjectSelect.jsx'
import {TeacherSubjectSelect} from './TeacherSubjectSelect.jsx'

const UserAddEdit = (props)=>{
  return (
    <div>
      <form>
        <div>
          <label>Username </label>
          <input type="text" placeholder="Username" value={props.parent.state.username}
            onChange={(event)=>{props.parent.handleInputChange({username: event.target.value})}}
          />
        </div>
        <div>
          <label>Password </label>
          <input type="password" placeholder="Password" value={props.parent.state.password}
            onChange={(event)=>{props.parent.handleInputChange({password: event.target.value})}}
          />
        </div>
        <div>
          <label>Firstname </label>
          <input type="text" placeholder="Firstname" value={props.parent.state.firstname}
            onChange={(event)=>{props.parent.handleInputChange({firstname: event.target.value})}}
          />
        </div>
        <div>
          <label>Middlename </label>
          <input type="text" placeholder="Middlename" value={props.parent.state.middlename}
            onChange={(event)=>{props.parent.handleInputChange({middlename: event.target.value})}}
          />
        </div>
        <div>
          <label>Lastname </label>
          <input type="text" placeholder="Lastname" value={props.parent.state.lastname}
            onChange={(event)=>{props.parent.handleInputChange({lastname: event.target.value})}}
          />
        </div>
        <div>
          <label>
            User Type :
            {
              (()=>{
                if(props.parent.state.state_type=="Add"){
                  return (
                    <select required value={props.parent.state.type} onChange={(event)=>{props.parent.handleInputChange({type: event.target.value,subject_subject:[]})}}>
                      <option value="" disabled></option>
                      <option value="2">Teacher</option>
                      <option value="3">Student</option>
                    </select>
                  )
                }
                else return (<div>{props.parent.state.type=="2"?"Teacher":"Student"}</div>)
              })()
            }
          </label>
        </div>
        <div>
          <label>
            Subjects
            {
              (()=>{
                if(props.parent.state.type == "2"){
                  var select = props.parent.state.subject_subject.map((item,index)=>
                    <TeacherSubjectSelect key={item} parent={props.parent} value={item} index={index} subject_subject={props.parent.state.subject_subject.slice()} />
                  )
                  return (
                    <div>
                      {select}
                      <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{
                        event.preventDefault();
                        if(props.parent.state.subject_subject.length >= props.parent.state.subject.length){

                        }
                        else props.parent.handleInputChange({subject_subject:[...props.parent.state.subject_subject,""]});

                      }}>
                          +
                      </button>
                    </div>
                  )
                }
                else{
                  var select = props.parent.state.subject_subject.map((item,index)=>
                    <StudentSubjectSelect key={item} parent={props.parent} value={item} index={index} subject_subject={props.parent.state.subject_subject.slice()} />
                  )
                  return (
                    <div>
                      {select}
                      <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{
                        event.preventDefault();
                        if(props.parent.state.subject_subject.length >= props.parent.state.available_subject.length){}
                        else props.parent.handleInputChange({subject_subject:[...props.parent.state.subject_subject,""]});
                      }}>
                        +
                      </button>
                    </div>
                  )
                }
              })()
            }
          </label>
        </div>
        <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{props.parent.handleCancelButton(event);}}>
            Cancel
        </button>
        <button type="button" className="btn btn-outline-dark"  type="submit" onClick={(event)=>{props.parent.handleSubmitButton(event);}}>
            Submit
        </button>
      </form>
    </div>
  )
}
export {UserAddEdit}
