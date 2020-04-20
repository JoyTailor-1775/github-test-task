import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './search-panel.scss';

import { reposOperations, reposActions } from '../../store/githubRepos';

const INITIAL_STATE = {
  searchReq: '',
};
Object.freeze(INITIAL_STATE);

class SearchPanel extends PureComponent {
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

  onSearch = async (e) => {
    e.preventDefault();
    if (!this.state.searchReq) return;
    const params = {
      name: this.state.searchReq.trim(),
      page: 0,
    };
    await this.props.updateQuery(params);
    await this.props.getRepos(this.props.query);
  };

  onSearchCancel = (e) => {
    this.setState({ ...INITIAL_STATE });
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

const mapStateToProps = (state) => ({
  query: state.gitHub.query,
  repos: state.gitHub.repos,
});

const MapDispatchToProps = {
  getRepos: reposOperations.requestRepos,
  updateQuery: reposActions.updateQueryRequest,
};

export default connect(mapStateToProps, MapDispatchToProps)(SearchPanel);
