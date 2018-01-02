import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
const emptyQuestion = {
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
class QuestionPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',

      ...emptyQuestion,

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

    this.fetchSubject = this.fetchSubject.bind(this)
    this.fetchExamType = this.fetchExamType.bind(this)
    this.fetchTeacher = this.fetchTeacher.bind(this)
    this.fetchQuestionType = this.fetchQuestionType.bind(this)
    this.fetchQuestion = this.fetchQuestion.bind(this)
  }
  componentDidMount() {
      this.fetchSubject();
      this.fetchExamType();
      this.fetchTeacher();
      this.fetchQuestionType();
      this.fetchQuestion();
  }
  fetchSubject(){
      $.get("../api/admin/subject/subject_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.subjects = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchExamType(){
      $.get("../api/admin/exam_type/exam_type_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.exam_types = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchTeacher(){
      $.get("../api/admin/teacher/teacher_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.teachers = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchQuestionType(){
      $.get("../api/admin/question_type/question_type_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.question_types = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchQuestion(){
      $.get("../api/admin/question/question_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.questions = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
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
        this.fetchSubject();
        this.fetchExamType();
        this.fetchTeacher();
        this.fetchQuestionType();
        this.fetchQuestion();
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
    this.fetchSubject();
    this.fetchExamType();
    this.fetchTeacher();
    this.fetchQuestionType();
    this.fetchQuestion();
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
        this.fetchSubject();
        this.fetchExamType();
        this.fetchTeacher();
        this.fetchQuestionType();
        this.fetchQuestion();
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
      ...emptyQuestion
    })
  }
  render(){
    var items = this.state.questions.map((q,index)=>(
      <tr key={q.id}>
        <td>{index+1}</td>
        <td>{q.description}</td>
        <td>{q.subject_description}</td>
        <td>{q.teacher_name}</td>
        <td>{q.question_type_description}</td>
        <td>{q.exam_type_description}</td>
        <td>{q.point}</td>
        <td>{q.question_options.length}</td>
        <td>
          <button
            onClick={(event)=>{
              this.handleUpdateButton(q);
            }}
            >
              Update
          </button>
          <button
            onClick={(event)=>{
              this.handleDeleteButton(q.id);
            }}
            >
              Delete
          </button>
        </td>
      </tr>
    ));
    if(this.state.state_type == "Add" || this.state.state_type == "Update"){
      return (
        <div>
          <form>
            <div>
              <label>
                Question Type
                {(()=>{
                    if(this.state.state_type=="Add"){
                      return (
                        <select value={this.state.question_type_id}
                          onChange={(event)=>{
                            var description = this.state.question_types.find(o => o.id == event.target.value).description;
                            var question_options =[];
                            if(description == "True or False"){
                              question_options.push({description: "true",is_correct: 1});
                              question_options.push({description: "false",is_correct: 0});
                            }
                            this.handleInputChange({
                              question_type_id: event.target.value,
                              question_type_description: description,
                              question_options: question_options
                            })
                          }}>
                          <option value="" disabled></option>
                          {this.state.question_types.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
                        </select>
                      )
                    }
                    else return (<div>{this.state.question_type_description}</div>)
                })()}
              </label>
            </div>
            <div>
              <label>Description </label>
              <input type="text" placeholder="Description" value={this.state.description}
                onChange={(event)=>{this.handleInputChange({description: event.target.value})}}
              />
            </div>
            <div>
              <label>
                Subject
                {(()=>{
                // if(this.state.subject_id==""){this.state.subjects.some((item,index,array)=>{return this.setState({subject_id:item.id})});}
                return (
                  <select value={this.state.subject_id} onChange={(event)=>{this.handleInputChange({subject_id: event.target.value})}}>
                    <option value="" disabled></option>
                    {this.state.subjects.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
                  </select>
                )
                })()}
              </label>
            </div>
            <div>
              <label>
                Author
                {(()=>{
                return (
                  <select value={this.state.teacher_id} onChange={(event)=>{this.handleInputChange({teacher_id: event.target.value})}}>
                    <option value="" disabled></option>
                    {this.state.teachers.map((q,i)=><option key={q.id} value={q.id}>{q.teacher_name}</option>)}
                  </select>
                )
                })()}
              </label>
            </div>
            <div>
              <label>
                Exam Type
                {(()=>{
                return (
                  <select value={this.state.exam_type_id} onChange={(event)=>{this.handleInputChange({exam_type_id: event.target.value})}}>
                    <option value="" disabled></option>
                    {this.state.exam_types.map((q,i)=><option key={q.id} value={q.id}>{q.description}</option>)}
                  </select>
                )
                })()}
              </label>
            </div>
            <div>
              <label>Point </label>
              {()=>{
                  if(!this.state.point)this.handleInputChange({point: 1});
                }}
              <input type="number" value={this.state.point}
                onChange={(event)=>{
                  if(event.target.value >0)this.handleInputChange({point: event.target.value})
                }}
              />
            </div>
            <div>
              <label>
                Choices
                {
                  (()=>{
                    var type_description = this.state.question_type_description;
                    var input;
                    if(type_description == "Multiple Choice"){
                      input = this.state.question_options.map((item,index)=>
                        <MultipleChoice key={item.id} obj={this} value={item.description} index={index} question_options={this.state.question_options.slice()} />
                      )
                    }
                    else if(type_description == "Identification"){
                      input = this.state.question_options.map((item,index)=>
                        <Identification key={item.id} obj={this} value={item.description} index={index} question_options={this.state.question_options.slice()} />
                      )
                    }
                    else if(type_description == "Enumeration"){
                      input = this.state.question_options.map((item,index)=>
                        <Enumeration key={item.id} obj={this} value={item.description} index={index} question_options={this.state.question_options.slice()} />
                      )
                    }
                    else if(type_description == "True or False"){
                      input = this.state.question_options.map((item,index)=>
                        <TrueFalse key={item.id} obj={this} value={item.description} index={index} question_options={this.state.question_options.slice()} />
                      )
                    }
                    return (
                      <div>
                        {input}
                        <button onClick={(event)=>{
                          event.preventDefault();
                          var add={
                            description:"",
                            is_correct:"0",
                          };
                          if(type_description == "True or False")return;
                          if(type_description == "Identification" || type_description == "Enumeration"){add.is_correct = "1"}
                          if(+this.state.option_limit != 0){
                            var limit = +this.state.option_limit;
                            if(this.state.question_options.length <= limit){
                              this.handleInputChange({question_options:[...this.state.question_options,add]});
                            }
                          }
                          else this.handleInputChange({question_options:[...this.state.question_options,add]});
                          }}>
                            +
                        </button>
                      </div>
                    )
                  })()
                }
                {

                }
              </label>
            </div>
            <button onClick={(event)=>{this.handleCancelButton(event);}}>
                Cancel
            </button>
            <button type="submit" onClick={(event)=>{this.handleSubmitButton(event);}}>
                Submit
            </button>
          </form>
        </div>
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
        <table>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Author</th>
            <th>Type</th>
            <th>Exam Type</th>
            <th>Points</th>
            <th># Options</th>
            <th>Action</th>
          </tr>
          {
            items
          }
        </table>
        </div>
      )
    }
  }
}
const MultipleChoice = (props)=>{
  return (
    <div>
    <div>
      <label>
      <input type="text" value={props.value}
        onChange={(event)=>{
          event.preventDefault();
          props.question_options[props.index].description = event.target.value
          props.obj.handleInputChange({question_options: props.question_options})
        }}
      />
      </label>
      <label>
          Is Correct
          <input
            name={props.value} type="checkbox" checked={+(props.question_options[props.index].is_correct)?true:false}
            onChange={
              ()=>{
                props.question_options[props.index].is_correct = props.question_options[props.index].is_correct=="1"?"0":"1"
                props.obj.handleInputChange({question_options: props.question_options})
              }
            }
          />
        </label>
    </div>
    <button onClick={(event)=>{
      event.preventDefault()
      props.question_options.splice(props.index, 1)
      props.obj.handleInputChange({question_options:props.question_options})
    }}>x</button>
    </div>
  )
}
const TrueFalse = (props)=>{
  return (
    <div>
    <div>
      <label>
      {props.value}
      <input
        name={props.value} type="checkbox" checked={+(props.question_options[props.index].is_correct)?true:false}
        onChange={
          (event)=>{
            if(event.target.checked){
              props.question_options[props.index].is_correct = "1"
              if(0 == props.index)props.question_options[1].is_correct = "0"
              else props.question_options[0].is_correct = "0"
              props.obj.handleInputChange({question_options: props.question_options})
            }
          }
        }
      />
      </label>
    </div>
    </div>
  )
}
const Identification = (props)=>{
  return (
    <div>
    <div>
      <label>
      <input type="text" value={props.value}
        onChange={(event)=>{
          event.preventDefault();
          props.question_options[props.index].description = event.target.value
          props.obj.handleInputChange({question_options: props.question_options})
        }}
      />
      </label>
    </div>
    <button onClick={(event)=>{
      event.preventDefault()
      props.question_options.splice(props.index, 1)
      props.obj.handleInputChange({question_options:props.question_options})
    }}>x</button>
    </div>
  )
}
const Enumeration = Identification;



export default QuestionPage
