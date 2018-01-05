import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
const removeItemWithThisValue = (arr,value)=>{
  arr.find((o, i) => {
      if (o.question_id == value) {
          arr.splice(i, 1);
          return true;
      }
  })
}

const ExamQuestion = (props)=>{
  var exam_questions = props.parent.state.exam_questions.slice()
  var multipleChoice = exam_questions.filter(item=>item.question_type_description=="Multiple Choice")||[]
  var identification = exam_questions.filter(item=>item.question_type_description=="Identification")||[]
  var enumeration = exam_questions.filter(item=>item.question_type_description=="Enumeration")||[]
  var trueFalse = exam_questions.filter(item=>item.question_type_description=="True or False")||[]
  return (
    <ul>
      <li key={"multipleChoice"}><b>Multiple Choice </b>({multipleChoice.length})items ({
        (()=>{
          if(multipleChoice.length>0){
            return multipleChoice.reduce(function (acc, obj) { return (+acc) +(+obj.question_point); },0);
          }
          return "0"
        })()
      }) point</li>
      {
        multipleChoice.map((item,index)=>
          <li>{item.question_description}
            <button
              onClick={
                (event)=>{
                  removeItemWithThisValue(exam_questions,item.question_id)
                  props.parent.setState({exam_questions:exam_questions})
                }
              }
            >x</button>
          </li>)
      }
      <li key={"trueFalse"}><b>True or False </b>({trueFalse.length})items ({
        (()=>{
          if(trueFalse.length>0){
            return trueFalse.reduce(function (acc, obj) { return (+acc) +(+obj.question_point); },0);
          }
          return "0"
        })()
      }) point</li>
      {
        trueFalse.map((item,index)=>
          <li>{item.question_description}
            <button
              onClick={
                (event)=>{
                  removeItemWithThisValue(exam_questions,item.question_id)
                  props.parent.setState({exam_questions:exam_questions})
                }
              }
            >x</button>
          </li>)
      }
      <li key={"identification"}><b>Identification </b>({identification.length})items ({
        (()=>{
          if(identification.length>0){
            return identification.reduce(function (acc, obj) { return (+acc) +(+obj.question_point); },0);
          }
          return "0"
        })()
      }) point</li>
      {
        identification.map((item,index)=>
          <li>{item.question_description}
            <button
              onClick={
                (event)=>{
                  removeItemWithThisValue(exam_questions,item.question_id)
                  props.parent.setState({exam_questions:exam_questions})
                }
              }
            >x</button>
          </li>)
      }
      <li key={"enumeration"}><b>Enumeration </b>({
        (()=>{
          if(enumeration.length>0){
            return enumeration.reduce(function (acc, obj) { return acc + obj.question_options.length; }, 0);
          }
          return "0"
        })()
      }) items ({
        (()=>{
          if(enumeration.length>0){
            return enumeration.reduce(function (acc, obj) { return acc + obj.question_options.length * obj.question_point; }, 0);
          }
          return "0"
        })()
      }) point</li>
      {
        enumeration.map((item,index)=>
          <li key={item.question_id}>{item.question_description}
            <button
              onClick={
                (event)=>{
                  removeItemWithThisValue(exam_questions,item.question_id)
                  props.parent.setState({exam_questions:exam_questions})
                }
              }
            >x</button>
          </li>)
      }

    </ul>
  )
}

export {ExamQuestion}
