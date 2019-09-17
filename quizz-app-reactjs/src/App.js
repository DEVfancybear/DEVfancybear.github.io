import React, { Component } from 'react';
import './App.css';
import Quiz from './Quiz';
import NextQuestion from './NextQuestion';
import FinishedQuiz from './FinishedQuiz';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {quizInfo: [{question:"Năm 1945, các quốc gia Đông Nam Á nào giành được độc lập ?", id:0, active:true, answers:[{answer:"Việt Nam-Inđônêxia- Lào.", correct:true}, {answer:"Việt Nam –Lào – Campuchia.", correct:false}, {answer:"Inđônêxia –Mã Lai –Philippin.", correct:false}, {answer:"Thái Lan –Lào –Brunây.", correct:false}], answerPicked:false},
{question:'Pháp tiến hành khai thác thuộc địa lần hai ở Đông Dương trong hoàn cảnh nào', id:1, active:false, answers:[{answer:"Pháp là nước thắng trận, thu nhiều lợi nhuận cần tìm thị trường", correct:false}, {answer:'Pháp là nước thắng trận, bị tổn thất nặng nề.', correct:true}, {answer:'Pháp là nước bại trận, bị hậu quả nặng nề.', correct:false}, {answer:'Pháp là nước bại trận, phải đền bồi chiến phí', correct:false}], answerPicked:false},
{question:"Trong đợt khai thác lần hai, Pháp đẩy mạnh lập đồn điền cao su là vì:", id:2, active:false, answers:[{answer:"Cao su là nguyên liệu chủ yếu phục vụ cho công nghiệp chính quốc.", correct:true}, {answer:"Để phá vỡ kinh tế nông nghiệp ở Việt Nam.", correct:false}, {answer:"Ở Việt Nam có diện tích đất trồng lớn.", correct:false}, {answer:"Đem lại nhiều lợi nhuận cho Pháp và các nước khác.", correct:false}], answerPicked:false},
{question:'Trong ngành khai thác mỏ, để đẩy mạnh tiến độ khai thác Pháp đã:', id:3, active:false, answers:[{answer:'Đầu tư vốn và kỹ thuật.', correct:false}, {answer:'Tăng cường đàn áp công nhân.', correct:false}, {answer:'Bổ sung thêm vốn và nhân công.', correct:true}, {answer:'Tăng giờ làm, giảm lương.', correct:false}], answerPicked:false}
],
      correctAnswers:0,
      displayQuiz: false,
      finishScreen: false,
      showStartBtn: true,
      startTime:0,
      testTime:0
    }

    this.pickAnswer = this.pickAnswer.bind(this);
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.FinishQuiz = this.FinishQuiz.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  pickAnswer(answerBool, idNum, index){
    let quizArrCopy = [...this.state.quizInfo];
    quizArrCopy[idNum].answerPicked = true;

    if(answerBool){
      let correctCopy = this.state.correctAnswers;
      correctCopy++;
      quizArrCopy[idNum].answers[index].correctActive = true;//set answer color to green if correct

      this.setState({correctAnswers: correctCopy, quizInfo: quizArrCopy});
    }else{
      quizArrCopy[idNum].answers[index].wrongActive = true;
      this.setState({quizInfo: quizArrCopy});
    }

  }

  loadNextQuestion(){
    //if activePicked is false, dont show button
    let copy = [...this.state.quizInfo];
    for(let i=0; i<copy.length; i++){
      if(copy[i].active==true && i!==copy.length-1){
        copy[i].active = false;
        copy[i+1].active = true;
        break;
      }
    }

    this.setState({quizInfo: copy});
  }

  startQuiz(){
    //start timer
    var nDate = Date.now();
    this.setState({displayQuiz: true, showStartBtn:false, startTime:nDate});
  }

  FinishQuiz(){
    let finishTime = Date.now();
    let totalTime = (finishTime-this.state.startTime)/1000;
    this.setState({displayQuiz:false, finishScreen:true, testTime:totalTime});
  }

  restartQuiz(){
    let quizArrCopy = [...this.state.quizInfo];
    quizArrCopy = quizArrCopy.map((current,index)=>{
      current.answerPicked = false;
      current.answers = current.answers.map((cur2, index2)=>{
        if(cur2.hasOwnProperty('correctActive')){
          delete cur2.correctActive;
        }else if(cur2.hasOwnProperty('wrongActive')){
          delete cur2.wrongActive;
        }
        return cur2;
      })

      current.active = false;
      return current;
    });

    quizArrCopy[0].active = true;
    var nDate = Date.now();
    this.setState({displayQuiz:true, correctAnswers:0, finishScreen:false, quizInfo: quizArrCopy, startTime:nDate});
    //start timer
  }


  render(){
    return (
    <div className="App">
      <Quiz quizData={this.state.quizInfo} pAnswer={this.pickAnswer} dsplQuiz={this.state.displayQuiz} startQuiz = {this.startQuiz} showStart={this.state.showStartBtn} />
      <NextQuestion loadNext={this.loadNextQuestion} quizData = {this.state.quizInfo} fQuiz={this.FinishQuiz} showFinish={this.state.finishScreen} />
      <FinishedQuiz showFinish={this.state.finishScreen} correctA={this.state.correctAnswers} totalQuestions={this.state.quizInfo.length} restart={this.restartQuiz} testTime={this.state.testTime} />
    </div>
  );
  }
}

export default App;
