import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import moment from 'moment';
import {QuestionContainer} from './question/QuestionContainer.jsx'
import {ExamContainer} from './exam/ExamContainer.jsx'
import {ExamTable} from './exam/ExamTable.jsx'
import {fetchTime,fetchExam,fetchSubject,fetchTeacher,fetchExamType,fetchQuestion,fetchQuestionType,fetchAvailableSubject} from './fetch.jsx'
import {emptyQuestion,emptyExam} from './emptyState.jsx'

class ExamPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      exam_state_type: 'View',
      question_state_type: 'View',
      ...emptyQuestion,
      ...emptyExam,

      fetch_fiter:"",
      exams:[],
      exam_types: [],
      teachers: [],
      subjects: [],
      available_subjects:[],
      question_types:[],
      questions:[],
      current_time:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)

    this.handleExamDeleteButton = this.handleExamDeleteButton.bind(this)
    this.handleExamUpdateButton = this.handleExamUpdateButton.bind(this)
    this.handleExamAddButton = this.handleExamAddButton.bind(this)
    this.handleExamCancelButton = this.handleExamCancelButton.bind(this)
    this.handleExamSubmitButton = this.handleExamSubmitButton.bind(this)

    this.handleQuestionDeleteButton = this.handleQuestionDeleteButton.bind(this)
    this.handleQuestionUpdateButton = this.handleQuestionUpdateButton.bind(this)
    this.handleQuestionAddButton = this.handleQuestionAddButton.bind(this)
    this.handleQuestionCancelButton = this.handleQuestionCancelButton.bind(this)
    this.handleQuestionSubmitButton = this.handleQuestionSubmitButton.bind(this)
  }
  componentDidMount() {
      this.fetch()
  }
  fetch(){
    fetchSubject(this);
    fetchExamType(this);
    fetchTeacher(this);
    fetchQuestionType(this);
    fetchQuestion(this);
    fetchExam(this);
    fetchAvailableSubject(this);
    fetchTime(this);
  }
  handleInputChange(input){
    this.setState({...input});
  }

  handleExamSubmitButton(event){
    event.preventDefault();
      // if(!this.exam_description) return;
      // if(!this.exam_type_id) return;
      // if(!this.exam_teacher_subject_id) return;
      // if(!this.date_start) return;
      // if(!this.date_end) return;
      // if(!this.duration) return;

      if(!this.state.exam_questions.length) return;

      var mode = this.state.exam_state_type=="Add"?"add":"update"
      console.dir(this.state);
      $.post({
        url: "/../api/admin/exam/exam_"+mode+".php",
        data: {
          ...this.state
        }
      })
      .done((data)=>{
        console.dir(this.state);
        console.dir(this.state);


        this.setState({
          exam_state_type: "View",
          question_state_type: "View",
          ...emptyExam
        });
        this.fetch();
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  handleExamCancelButton(event){
    event.preventDefault();
    this.setState({
      exam_state_type: "View"
    })
  }
  handleExamDeleteButton(id){
    if (confirm("Are You Sure you Want to delete the user?") == true) {
      $.post({
        url: "/../api/admin/exam/exam_delete.php",
        data: {
          exam_id: id
        }
      })
      .done((data)=>{
        this.fetch();
      })
      .fail(function(xhr) {
          return alert("error: "+ xhr);
      });
    } else {

    }
  }
  handleExamUpdateButton(exam){
    exam.exam_state_type= "Update"
    exam.question_state_type= "View"
    this.setState({
      ...exam
    });
  }
  handleExamAddButton(exam){
    exam.exam_state_type= "Add"
    exam.question_state_type= "View"
    this.setState({
      ...emptyExam
    })
  }
/////////////////////////////////////////
handleQuestionSubmitButton(event){
  event.preventDefault();
    if(!this.state.question_description)return;
    if(!this.state.exam_type_id)return;
    if(!this.state.question_type_id)return;
    if(this.state.question_options.some((x)=>!x.description))return;
    if(!this.state.question_options.some((x)=>x.is_correct=="1"))return;

    var mode = this.state.question_state_type=="Add"?"add":"update"
    console.dir(this.state);
    $.post({
      url: "/../api/admin/question/question_"+mode+".php",
      data: {
        ...this.state
      }
    })
    .done((data)=>{
      this.setState({
        question_state_type: "View",
        ...emptyQuestion
      });
      this.fetch();
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
handleQuestionCancelButton(event){
  event.preventDefault();
  this.setState({
    question_state_type: "View",
    ...emptyQuestion
  })
}
handleQuestionDeleteButton(id){
  if (confirm("Are You Sure you Want to delete the user?") == true) {
    $.post({
      url: "/../api/admin/question/question_delete.php",
      data: {
        question_id: id
      }
    })
    .done((data)=>{
      this.fetch();
    })
    .fail(function(xhr) {
        return alert("error: "+ xhr);
    });
  } else {

  }
}
handleQuestionUpdateButton(question){
  question.question_state_type= "Update"
  this.setState({
    ...question
  })
}
handleQuestionAddButton(question){
  console.log("yeyyeye ur views ar ruine ddd")
  this.setState({
    question_state_type: 'Add',
    ...emptyQuestion
  })
}


  render(){
    return (
      <div>
        <ExamContainer parent={this} />
      </div>
    )
  }
}

export {ExamPage}
