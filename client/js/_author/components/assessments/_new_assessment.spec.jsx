import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import { NewAssessment }  from './_new_assessment';

describe('_new_assessment component', () => {
  let props;
  let result;
  let callFunction;

  beforeEach(() => {
    callFunction = false;
    props = {
      params: {
        id: '7',
      },
      editableBankId: '77',
      createAssessment: () => { callFunction = true; },
      publishAssessment: () => {},
      createAssessmentWithItem: () => { callFunction = true; },
    };
    result = TestUtils.renderIntoDocument(<NewAssessment {...props} />);
  });

  it('calls createAssessment', () => {
    expect(callFunction).toBeFalsy();
    result.createAssessment();
    expect(callFunction).toBeTruthy();
  });

  it('calls createItem', () => {
    expect(callFunction).toBeFalsy();
    result.createItem();
    expect(callFunction).toBeTruthy();
  });

  it('renders Heading and Assessment Form to DOM', () => {
    const heading = TestUtils.findRenderedDOMComponentWithClass(result, 'author--c-logo');
    expect(heading).toBeDefined();
    const assessmentForm = TestUtils.findRenderedDOMComponentWithClass(result, 'author--c-assessment-title');
    expect(assessmentForm).toBeDefined();
  });

});
