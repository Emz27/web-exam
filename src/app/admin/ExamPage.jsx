import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {QuestionAddEdit} from './question/QuestionAddEdit.jsx'
import {QuestionTable} from './question/QuestionTable.jsx'
import {fetchSubject,fetchTeacher,fetchExamType,fetchQuestion,fetchQuestionType} from './fetch.jsx'

const emptyState = {
  id:'',
  description: '',
  subject_id: '',
  subject_description: '',
  teacher_id: '',
  teacher_name: '',
  exam_type_id: '',
  exam_type_description:'',
  question_type_id: '',
  question_type_description:'',
  option_limit: 0,
  point: 1,
  question_options: [],
}
class ExamPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',

      ...emptyState,

      exam_types: [],
      teachers: [],
      subjects: [],
      question_types:[],
      questions:[]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
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
  }
  handleSubmitButton(event){
    event.preventDefault();
      if(!this.state.description)return;
      if(!this.state.subject_id)return;
      if(!this.state.teacher_id)return;
      if(!this.state.exam_type_id)return;
      if(!this.state.question_type_id)return;
      if(this.state.question_options.some((x)=>!x.description))return;
      if(!this.state.question_options.some((x)=>x.is_correct=="1"))return;

      var mode = this.state.state_type=="Add"?"add":"update"
      console.dir(this.state);
      $.get({
        url: "../api/admin/question/question_"+mode+".php",
        data: {
          ...this.state
        }
      })
      .done((data)=>{
        console.dir(data);
        this.setState({
          state_type: "View"
        });
        this.fetch();
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  handleCancelButton(event){
    event.preventDefault();
    this.setState({
      state_type: "View"
    })
    this.fetch();
  }
  handleInputChange(input){
    this.setState({...input});
  }
  handleDeleteButton(id){
    if (confirm("Are You Sure you Want to delete the user?") == true) {
      $.get({
        url: "../api/admin/question/question_delete.php",
        data: {
          id: id
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
  handleUpdateButton(question){
    question.state_type= "Update"
    this.setState({
      ...question
    })
  }
  handleAddButton(question){
    this.setState({
      state_type: 'Add',
      ...emptyState
    })
  }
  render(){
    if(this.state.state_type == "Add" || this.state.state_type == "Update"){
      return (
        <QuestionAddEdit parent={this} />
      )
    }
    else {
      return (
        <div>
        <button
          onClick={(event)=>{
            this.handleAddButton();
          }}
          >
            Add
        </button>
        <QuestionTable parent={this} />
        </div>
      )
    }
  }
}



export {ExamPage}
