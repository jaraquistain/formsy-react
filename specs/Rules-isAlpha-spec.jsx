var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Formsy = require('./../src/main.js');

describe('Rules: isAlpha', function() {
  var TestInput, isValid, form, input;

  beforeEach(function() {
    isValid = jasmine.createSpy('valid');

    TestInput = React.createClass({
      mixins: [Formsy.Mixin],
      updateValue: function (event) {
        this.setValue(event.target.value);
      },
      render: function () {
        if (this.isValid()) {
          isValid();
        }
        return <input value={this.getValue()} onChange={this.updateValue}/>
      }
    });

    form = TestUtils.renderIntoDocument(
      <Formsy.Form>
        <TestInput name="foo" validations="isAlpha"/>
      </Formsy.Form>
    );

    input = TestUtils.findRenderedDOMComponentWithTag(form, 'INPUT');

  });

  afterEach(function() {
    TestInput = isValid = isInvalid = form = null;
  });

  it('should pass with a string is only latin letters', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: 'myValue'}});
    expect(isValid).toHaveBeenCalled();
  });

  it('should fail with a string with numbers', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: 'myValue 42'}});
    expect(isValid).not.toHaveBeenCalled();
  });

  it('should fail with an undefined', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: undefined}});
    expect(isValid).not.toHaveBeenCalled();
  });

  it('should fail with a null', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: null}});
    expect(isValid).not.toHaveBeenCalled();
  });

  it('should fail with a number', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: 42}});
    expect(isValid).not.toHaveBeenCalled();
  });

  it('should fail with an empty string', function () {
    expect(isValid).not.toHaveBeenCalled();
    TestUtils.Simulate.change(input, {target: {value: ''}});
    expect(isValid).not.toHaveBeenCalled();
  });

});
