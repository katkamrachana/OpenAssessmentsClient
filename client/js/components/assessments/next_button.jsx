"use strict";

import React      from "react";
import {connect}  from "react-redux";

import {nextQuestions}    from "../../actions/assessment_progress";
import {questionCount}    from "../../selectors/assessment";
import {localizeStrings}  from "../../selectors/localize";
import Button             from "../common/button";

const select = (state, props) => {
  return {
    localizedStrings: localizeStrings(state, props).twoButtonNav,
    questionsPerPage: state.settings.questions_per_page || questionCount(state, props)
  };
};

/**
 * A button to navigate to the next Item or set of Items.  It's already
 * connected to the application.
 */
class NextButton extends React.Component {

  click() {
    this.props.nextQuestions(this.props.questionsPerPage);
  }

  render() {
    return (
      <Button buttonClass="c-btn c-btn--next"
              buttonText={this.props.localizedStrings.nextButton}
              onClick={() => this.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/>
        </svg>
      </Button>
    );
  }
};

export default connect(select, {nextQuestions})(NextButton);
