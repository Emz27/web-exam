import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import {fetchAvailableSubject,fetchSubject,fetchTeacher,fetchExamType,fetchQuestion,fetchQuestionType} from './fetch.jsx'
import {emptyQuestion} from './emptyState.jsx'
import {QuestionContainer} from './question/QuestionContainer.jsx'

class QuestionPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      question_state_type: 'View',
      ...emptyQuestion,
      exam_questions:[],

      available_subjects:[],
      teachers: [],
      subjects: [],
      question_types:[],
      questions:[]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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
    fetchAvailableSubject(this);
  }
  handleQuestionSubmitButton(event){
    event.preventDefault();
      if(!this.state.question_description)return;
      if(!this.state.question_type_id)return;
      if(this.state.question_options.some((x)=>!x.description))return;
      if(!this.state.question_options.some((x)=>x.is_correct=="1"))return;

      var mode = this.state.question_state_type=="Add"?"add":"update"
      console.dir(this.state);
      $.post({
        url: "/../api/question/question_"+mode+".php",
        data: {
          ...this.state
        }
      })
      .done((data)=>{
        console.dir(data);
        this.setState({
          question_state_type: "View"
        });
        this.fetch();
        console.dir(data);
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  handleQuestionCancelButton(event){
    event.preventDefault();
    this.setState({
      question_state_type: "View"
    })
    this.fetch();
  }
  handleInputChange(input){
    this.setState({...input});
  }
  handleQuestionDeleteButton(id){
    if (confirm("Are You Sure you Want to delete the user?") == true) {
      $.post({
        url: "/../api/question/question_delete.php",
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
    this.setState({
      question_state_type: 'Add',
      ...emptyQuestion
    })
  }
  render(){
    return (
      <div>
        <h1>Question</h1>
        <QuestionContainer parent={this} />
      </div>
    )
  }
}
export {QuestionPage}
