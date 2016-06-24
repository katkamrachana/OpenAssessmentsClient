"use strict";

import React  from "react";

import * as AssessmentActions  from "../../actions/assessment";
import UniversalInput          from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    // Item to be displayed
    question          : React.PropTypes.object.isRequired,

    // Array of selected answer IDs
    response          : React.PropTypes.array.isRequired,

    // The position of the item in the array of items
    currentItemIndex  : React.PropTypes.number.isRequired,

    // The total number of items in the array of items
    questionCount     : React.PropTypes.number.isRequired,

    // Whether the item should be displayed as correct, incorrect,
    // or ungraded. Should match response constants declared below.
    messageIndex      : React.PropTypes.number.isRequired,

    goToNextQuestion  : React.PropTypes.func.isRequired,

    goToPrevQuestion  : React.PropTypes.func.isRequired,

    submitAssessment  : React.PropTypes.func.isRequired,

    selectAnswer      : React.PropTypes.func.isRequired,

    // TODO
    outcomes          : React.PropTypes.object,
  };

  getCounter(){
    if(this.props.shouldShowCounter){
      return (
        <span className="counter">
          {this.props.currentItemIndex + 1} of {this.props.questionCount}
        </span>
      );
    }
  }

  getResult(index){
    var text;

    if(index == CORRECT_RESPONSE){
      text = "Correct";
    } else if(index == INCORRECT_RESPONSE) {
      text = "Incorrect";
    } else {
      text = "";
    }

    return (
      <div className="check_answer_result">
        <p>{text}</p>
      </div>
    );
  }


  render() {
    var result = this.getResult(this.props.messageIndex);

    var counter = this.getCounter();

    var questionDirections;
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections = <div>Choose <b>ALL</b> that apply.</div>;
    } else {
      questionDirections = <div>Choose the <b>BEST</b> answer.</div>;
    }

    return (
      <div className="assessment_container">
        <div className="question">
          <div className="header">
            {counter}
            <p>{this.props.question.title}</p>
          </div>
          <div>
            <form className="edit_item">
              <div className="full_question" tabIndex="0">
                <div className="inner_question">
                  <div className="question_text">
                    {questionDirections}
                    <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.question.material
                        }}>
                    </div>
                  </div>
                  <UniversalInput
                    item={this.props.question}
                    isResult={false}
                    selectAnswer={this.props.selectAnswer}
                    response={this.props.response}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-8" >
                    {result}
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-4">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const UNGRADED_RESPONSE = 0;
export const CORRECT_RESPONSE = 1;
export const INCORRECT_RESPONSE = 2;
