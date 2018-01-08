import moment from 'moment';

const fetchSession = (props)=>{
    $.post("/../api/session.php")
    .done((data)=>{
      var data = JSON.parse(data);
      console.dir(data);
      props.setState({
        student_id: data.id,
        student_username: data.username,
        student_password: data.password,
        student_firstname: data.firstname,
        student_middlename: data.middlename,
        student_lastname: data.lastname,
        student_type: data.type,
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
const fetchPresentExam = (props)=>{
    $.post({
      url: "/../api/student_exam/student_exam_fetch.php",
      data:{
        student_id: props.state.student_id,
        state: "present"
      }
    })
    .done((data)=>{
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.student_present_exams = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchFutureExam = (props)=>{
    console.dir(props.state)
    $.post({
      url: "/../api/student_exam/student_exam_fetch.php",
      data:{
        student_id: props.state.student_id,
        state: "future"
      }
    })
    .done((data)=>{
      console.dir(data)
      var data = JSON.parse(data);
      console.dir(data)
      var result={};
      result.student_future_exams = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
const fetchPastExam = (props)=>{
    $.post({
      url: "/../api/student_exam/student_exam_fetch.php",
      data:{
        student_id: props.state.student_id,
        state: "past"
      }
    })
    .done((data)=>{
      console.dir(data)
      var data = JSON.parse(data);
      // console.dir(data)
      var result={};
      result.student_past_exams = data;
      props.setState({...result });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
}
export {fetchSession,fetchPastExam,fetchPresentExam, fetchFutureExam,fetchTime}
