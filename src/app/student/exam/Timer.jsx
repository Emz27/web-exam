// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment from 'moment'
class Timer extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        remaining_time:""
      }
      this.tick = this.tick.bind(this)
    }
    componentDidMount(){
      this.timer = setInterval(this.tick, 1000);
    }
    componentWillUnmount(){
      clearInterval(this.timer);
    }
    getTime(){

    }
    tick(){
      $.post("/../api/get_time.php")
      .done((data)=>{
        // console.log("start time: "+this.props.start_time);
        // console.log("current time: "+ data)
        this.setState(()=>({
          remaining_time: this.props.duration - moment(data).diff(moment(this.props.start_time),"minutes")
        }));
      })
      .fail(function(xhr) {
          return alert("error in fetching Time: "+ xhr);
      });
    }
    render(){
        var remaining_time = this.state.remaining_time
        return (
          <div>{remaining_time}</div>
        )
    }
}

export {Timer}
