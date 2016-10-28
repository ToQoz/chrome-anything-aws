import React from 'react'

const T = React.PropTypes

export default class Item extends React.Component {
  handleClick(e) {
    if (!e.metaKey) {
      e.preventDefault();
      this.props.onSelectItem({url: this.props.url, title: this.props.title});
    }
  }

  render() {
    var url = this.props.url;
    var title = this.props.title;

    var short_name = (new URL(url)).pathname.split("/")[1];
    if (short_name === 'zocalo' || short_name === 'servermigration') {
      short_name = 'ec2';
    }
    var icon = `aws-simple-icons/${short_name}.png`

    return (
      <a className="item" href={url} onClick={this.handleClick.bind(this)}>
        <div className="main">
          <img className="icon" src={icon} width="16" hegiht="16" />
          <span className="title">{title}</span>
        </div>
        <div className="sub"><span className="url">{url}</span></div>
      </a>
    );
  }
}
Item.propTypes = {
  title: T.string.isRequired,
  url:   T.string.isRequired,
  onSelectItem: T.func.isRequired
};
