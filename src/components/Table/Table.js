import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { reposActions, reposOperations } from '../../store/githubRepos';

import gitGubConfig from '../../configs/github';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      pageSize: 30,
    };
  }

  fetchApiRequest = async () => {
    await this.props.getRepos(this.props.query);
  };

  onPageChange = async (page) => {
    await this.props.updateQuery({ page });
    await this.fetchApiRequest();
  };

  onSortTable = async () => {
    const newOrder =
      this.props.query.order === gitGubConfig.DESC ? gitGubConfig.ASC : gitGubConfig.DESC;
    await this.props.updateQuery({
      order: newOrder,
    });
    if (!this.props.query.name) return;
    await this.fetchApiRequest();
  };

  render() {
    const { pageSize } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: 'Repository Name',
              accessor: 'name',
              sortable: false,
            },
            {
              Header: 'Full Name',
              accessor: 'full_name',
              sortable: false,
            },
            {
              Header: 'Stars',
              accessor: 'stargazers_count',
            },
          ]}
          manual
          data={this.props.repos.items}
          // GitGub api allows to get only the first 1000 results for an unauthenticated user.
          // Hence, 1000 is hard-coded here.
          pages={Math.ceil(
            this.props.repos.total_count
              ? this.props.repos.total_count < 1000
                ? this.props.total_count / this.state.pageSize
                : 1000 / this.state.pageSize
              : 0,
          )}
          loading={this.props.loading}
          sortable
          resizable={false}
          onSortedChange={this.onSortTable}
          defaultPageSize={pageSize}
          showPageSizeOptions={false}
          page={this.props.query.page}
          onPageChange={this.onPageChange}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  repos: state.gitHub.repos,
  query: state.gitHub.query,
  loading: state.gitHub.loading,
});

const MapDispatchToProps = {
  getRepos: reposOperations.requestRepos,
  updateQuery: reposActions.updateQueryRequest,
};

export default connect(mapStateToProps, MapDispatchToProps)(Table);
