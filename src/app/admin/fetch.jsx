
const fetchSubject = (props)=>{
    $.get("../api/admin/subject/subject_fetch.php")
    .done((data)=>{
      var data = JSON.parse(data);

      var result={};
      result.subjects = data;
      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchExamType = (props)=>{
    $.get("../api/admin/exam_type/exam_type_fetch.php")
    .done((data)=>{
      var data = JSON.parse(data);

      var result={};
      result.exam_types = data;
      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchTeacher = (props)=>{
    $.get("../api/admin/teacher/teacher_fetch.php")
    .done((data)=>{
      var data = JSON.parse(data);

      var result={};
      result.teachers = data;
      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchQuestionType = (props)=>{
    $.get("../api/admin/question_type/question_type_fetch.php")
    .done((data)=>{
      var data = JSON.parse(data);

      var result={};
      result.question_types = data;
      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchQuestion = (props)=>{
    $.get("../api/admin/question/question_fetch.php")
    .done((data)=>{
      var data = JSON.parse(data);

      var result={};
      result.questions = data;
      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}

export {fetchSubject,fetchTeacher,fetchExamType,fetchQuestion,fetchQuestionType}
