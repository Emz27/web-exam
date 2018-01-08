import moment from 'moment';
const fetchSession = (props)=>{
    $.post("/../api/session.php")
    .done((data)=>{
      var data = JSON.parse(data);
      console.dir(data);
      props.setState({
        teacher_id: data.id,
        teacher_username: data.username,
        teacher_password: data.password,
        teacher_firstname: data.firstname,
        teacher_middlename: data.middlename,
        teacher_lastname: data.lastname,
        teacher_type: data.type
      });
    })
    .fail(function(xhr) {
        return alert("error in fetching Time: "+ xhr);
    });
}
const fetchTime = (props)=>{
    $.post("/../api/get_time.php")
    .done((data)=>{
      var result={};
      result.current_time = data;

      props.setState({...result});
    })
    .fail(function(xhr) {
        return alert("error in fetching Time: "+ xhr);
    });
}
const fetchExam = (props)=>{
    $.post({
      url: "/../api/exam/exam_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.exams = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchAvailableSubject = (props)=>{
    $.post({
      url: "/../api/subject/available_subject_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.available_subjects = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchSubject = (props)=>{
    $.post({
      url: "/../api/subject/subject_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.subjects = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchExamType = (props)=>{
    $.post({
      url: "/../api/exam_type/exam_type_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.exam_types = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchTeacher = (props)=>{
    $.post({
      url: "/../api/teacher/teacher_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.teachers = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchQuestionType = (props)=>{
    $.post({
      url: "/../api/question_type/question_type_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.question_types = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchQuestion = (props)=>{
    $.post({
      url: "/../api/question/question_fetch.php",
      data:{fetch_filter:props.state.fetch_filter}
    })
    .done((data)=>{
      // console.dir(data)
      var data = JSON.parse(data);
      // console.dir(data)
      // console.dir(props.state.fetch_filter)
      var result={};
      result.questions = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}

export {
  fetchSession,
  fetchSubject,
  fetchTeacher,
  fetchExamType,
  fetchQuestion,
  fetchQuestionType,
  fetchAvailableSubject,
  fetchExam,
  fetchTime
}
