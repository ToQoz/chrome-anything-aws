import React from 'react'
const T = React.PropTypes

export default class Select extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: this.props.value}
  }
  handleChange (e) {
    var v = e.target.value
    this.setState({value: v})
    this.props.onChange(v)
  }
  render () {
    return (
      <select value={this.state.value} onChange={this.handleChange.bind(this)}>
        {this.props.options.map(function (opt, i) {
          return (<option
            key={opt.value}
            value={opt.value}
          >{opt.label}</option>)
        })}
      </select>
    )
  }
}

Select.propTypes = {
  value: T.string.isRequired,
  options: T.array.isRequired,
  onChange: T.func.isRequired
}
