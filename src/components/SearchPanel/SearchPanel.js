import React, { PureComponent } from 'react';
import './search-panel.scss';

export default class SearchPanel extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchReq: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSearch = (e) => {
    e.preventDefault();
    console.log('search');
  };

  onSearchCancel = (e) => {
    console.log('cancel search');
  };
  render() {
    return (
      <form className="search-panel" onSubmit={this.onSearch}>
        <input
          name="searchReq"
          className="search-panel__input"
          value={this.state.searchReq}
          onChange={this.onChange}
          maxLength="30"
        />
        <div className="controls">
          <button className="controls__button--action" type="submit">
            Search
          </button>
          <button className="controls__button--cancel" type="reset" onClick={this.onSearchCancel}>
            X
          </button>
        </div>
      </form>
    );
  }
}
