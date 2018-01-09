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
        var duration = (this.props.duration*60)*1000
        var difference = moment(data).diff(moment(this.props.start_time))
        var h = moment.duration(duration - difference).hours()
        var m = moment.duration(duration - difference).minutes()
        var s = moment.duration(duration - difference).seconds()
        this.setState(()=>({
          remaining_time: h+" : "+m+" : "+s
        }));
      })
      .fail(function(xhr) {
          return alert("error in fetching Time: "+ xhr);
      });
    }
    render(){
        var remaining_time = this.state.remaining_time
        return (
          <div class="p-2 text-center bg-danger text-white">
            <h4>{remaining_time}</h4>
          </div>
        )
    }
}

export {Timer}
