import React, { PureComponent } from 'react';
import './search-panel.scss';

const INITIAL_STATE = {
  searchReq: '',
};
Object.freeze(INITIAL_STATE);

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
    if (!this.state.searchReq) return;
  };

  onSearchCancel = (e) => {
    this.setState({ ...INITIAL_STATE });
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
          <button className="controls__button controls__button--action" type="submit">
            Search
          </button>
          <button
            className="controls__button controls__button--cancel"
            type="reset"
            onClick={this.onSearchCancel}
          >
            X
          </button>
        </div>
      </form>
    );
  }
}
