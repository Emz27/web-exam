import moment from 'moment';

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
    console.dir(props)
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
export {fetchPastExam,fetchPresentExam, fetchFutureExam,fetchTime}
