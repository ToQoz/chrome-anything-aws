import React from 'react'
const T = React.PropTypes

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ""};
  }
  handleChange(e) {
    var v = e.target.value;
    this.setState({input: v});
    this.props.onChange(v);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          ref="RawInput"
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
          onKeyUp={this.props.onKeyUp.bind(this)}
          onKeyDown={this.props.onKeyDown.bind(this)}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }
}

Input.propTypes = {
  onChange: T.func.isRequired,
  onKeyUp: T.func.isRequired,
  onKeyDown: T.func.isRequired,
  autoFocus: T.bool
};
