import React from 'react'
import Item from './item.js'

const T = React.PropTypes

export default class List extends React.Component {
  render () {
    return (
      <ul className="list">
        {this.props.items.map((t, i) => {
          return (<li key={t.url} className={this.props.selectedIndex === i ? 'selected' : ''}><Item title={t.title} url={t.url} onSelectItem={this.props.onSelectItem} /></li>)
        })}
      </ul>
    )
  }
}

List.propTypes = {
  items: T.array.isRequired,
  selectedIndex: T.number.isRequired,
  onSelectItem: T.func.isRequired
}
