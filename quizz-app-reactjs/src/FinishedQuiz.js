import React, { Component } from 'react';
class FinishedQuiz extends Component{
  render(){
    if(this.props.showFinish){
     var completeTime = Math.round(this.props.testTime );
     if(completeTime<60){
      completeTime = completeTime + " seconds";
     }else if(completeTime>=60){
      let minutes = Math.floor(completeTime/60);
      let seconds = completeTime%60;
      completeTime = minutes + " minutes " + seconds + " seconds";
     }

    return(
<div>
        <p className="complete-title" >Xin Chúc Mừng!</p>
        <p>Bạn có {this.props.correctA} trong {this.props.totalQuestions} câu trả lời đúng</p>
        <p>Bạn mất {completeTime} để hoàn thành bài kiểm tra.</p>
        <button onClick={this.props.restart} >Khởi động lại</button>  
</div>
      )
    }else{
      return null;
    }

  }
}
export default FinishedQuiz;