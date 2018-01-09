import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import moment from 'moment'

import {ExamInfo} from './exam/ExamInfo.jsx'
import {ExamSheet} from './exam/ExamSheet.jsx'
import {fetchSession,fetchPastExam,fetchPresentExam, fetchFutureExam,fetchTime} from './fetch.jsx'
import {emptyUser} from './emptyState.jsx'

class ExamPage extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      ...emptyUser,
      student_subjects:[],
      student_future_exams:[],
      student_past_exams:[],
      student_present_exams:[],

      current_time:""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.fetch()
  }
  fetch(){
    fetchPresentExam(this)
    fetchTime(this)
  }
  handleInputChange(ans){
    fetchTime(this)
    console.log("current_time: "+this.state.current_time)
    console.log("date_created: "+ans.date_created)
    console.log("duration: "+ans.duration)
    console.log("difference: "+moment(this.state.current_time).diff(ans.date_created, 'minutes'))
    if(moment(this.state.current_time).diff(ans.date_created, 'minutes')>ans.duration){
      alert("You have already reached your exam time limit");
      return;
    }
    $.post({
      url:"/../api/student_exam/student_answer_update.php",
      data:{
        answer:ans.answer,
        student_answer_id: ans.id
      }
    })
    .done((data)=>{
      console.log(data);
      this.fetch();
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
  }
  render(){
    return (
      <div className="col d-flex align-items-stretch m-0 p-0">
        <ExamInfo parent={this} />
        <ExamSheet parent={this} />
      </div>
    )
  }
}
export {ExamPage}
