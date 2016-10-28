import React from 'react';
import Select from './select';
import Input from './input.js';
import List from './list.js';

import regions from '../data/regions.js';
import services from '../data/services.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: this.getDefaultRegion(),
      query: "",
      selectedIndex: 0,
    };
  }

  handleSelectItem(item) {
    chrome.tabs.update(null, {url: item.url});
  }

  getDefaultRegion() {
    return localStorage.getItem('default-region') || 'us-east-1';
  }

  setDefaultRegion(region) {
    return localStorage.setItem('default-region', region);
  }

  handleChangeRegion(newValue) {
    this.setDefaultRegion(newValue);

    this.setState({
      region: newValue,
      query: this.state.query,
      selectedIndex: this.state.selectedIndex
    });
  }
  handleChangeQuery(newValue) {
    var index = this.state.selectedIndex;
    this.setState({
      region: this.state.region,
      query: newValue,
      selectedIndex: Math.max(0, Math.min(index, this.items(newValue).length-1))
    });
  }
  handleChangeSelectedIndex(newValue) {
    this.setState({
      region: this.state.region,
      query: this.state.query,
      selectedIndex: newValue
    });
  }
  items(query) {
    var _services = services.map(function(t) { return {title: t.title, url: t.url.replace(/\${region}/g, this.state.region)}; }.bind(this));

    if (!query) {
      return _services;
    }

    return _services.
      filter(function(t) {
        var target = [t.title, t.url].join(" ");
        var match = true;
        // filter by AND
        query.split(/ +/).forEach(function(q) {
          if (!q) return;

          if (!(new RegExp(q, 'i')).test(target)) {
            match = false;
          }
        });
        return match;
      }.bind(this));
  }

  handleKeyup(e) {
    switch (e.keyCode) {
      case 13:
        this.handleEnter(e);
        break;
      case 38:
        this.handlePrev(e);
        break;
      case 40:
        this.handleNext(e);
        break;
    }
  }

  handleKeydown(e) {
  }

  handleEnter(e) {
    e.preventDefault();
    this.handleSelectItem(this.items(this.state.query)[this.state.selectedIndex]);
  }

  handlePrev(e) {
    e.preventDefault();
    var v = this.state.selectedIndex - 1;
    this.handleChangeSelectedIndex(Math.max(0, v))
  }

  handleNext(e) {
    e.preventDefault();
    var v = this.state.selectedIndex + 1;
    this.handleChangeSelectedIndex(Math.min(this.items(this.state.query).length - 1, v))
  }

  render() {
    return (
      <div>
        <div className="control">
          <div className="query-input">
            <Input
              onChange={this.handleChangeQuery.bind(this)}
              onKeyUp={this.handleKeyup.bind(this)}
              onKeyDown={this.handleKeydown.bind(this)}
              autoFocus={true}
            />
          </div>
          <div className="region-select">
            <Select value={this.state.region} name="region" options={regions} onChange={this.handleChangeRegion.bind(this)} />
          </div>
        </div>
        <div className="filtered-list">
          <List items={this.items(this.state.query)} selectedIndex={this.state.selectedIndex} onSelectItem={this.handleSelectItem} />
        </div>
      </div>
    );
  }
}
