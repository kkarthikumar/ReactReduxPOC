import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import UserForm from './UsersForm';

function setup(saving) {
  let props = {
    user: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<UserForm {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('UserForm via React Test Utils', () => {
  it('renders form', () => {
    const { output } = setup();
    expect(output.type).toBe('form');
  });

  it('save button is labeled "Submit" when not submitting', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[4];
    expect(submitButton.props.value).toBe('Submit');
  });

  it('save button is labeled "Submitting..." when submitting', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[4];
    expect(submitButton.props.value).toBe('Submitting...');
  });
});
