import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import {FutureExamTable} from './FutureExamTable.jsx'
import {PastExamTable} from './PastExamTable.jsx'
import {PresentExamTable} from './PresentExamTable.jsx'
import {fetchPastExam,fetchPresentExam, fetchFutureExam,fetchTime} from './fetch.jsx'
import {emptyUser} from './emptyState.jsx'

class ProfilePage extends React.Component{
  constructor(props) {
    super(props);
    console.dir(props.user);
    this.state ={
      student_id: props.user.id,
      student_username: props.user.username,
      student_password: props.user.password,
      student_firstname: props.user.firstname,
      student_middlename: props.user.middlename,
      student_lastname: props.user.lastname,
      student_type: props.user.type,

      student_subjects:[],
      student_future_exams:[],
      student_past_exams:[],
      student_present_exams:[],

      current_time:""
    }
    console.dir(this)
  }
  componentDidMount() {
      this.fetch()
  }
  fetch(){
    fetchPastExam(this)
    fetchPresentExam(this)
    fetchFutureExam(this)
    fetchTime(this)
  }
  handleInputChange(input){
    this.setState({...input});
  }
  render(){
    return (
      <div>
        <PresentExamTable parent={this} />
        <FutureExamTable parent={this} />
        <PastExamTable parent={this} />
      </div>
    )
  }
}
export {ProfilePage}
