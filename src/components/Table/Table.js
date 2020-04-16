import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';

import { reposActions, reposOperations } from '../../store/githubRepos';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
    };
  }

  onSortTable = (newSorted, column, additive) => {
    console.log('lets do some sorting, baby', newSorted, column, additive);
  };

  fetchData = () => {
    this.setState({ loading: true });

    const testData = [
      {
        name: 'stsft',
        publisher: 'werwer',
        stars: 303,
      },
      {
        name: 'stsft',
        publisher: 'werwer',
        stars: 303,
      },
      {
        name: 'stsft',
        publisher: 'werwer',
        stars: 303,
      },
    ];

    this.setState({
      data: testData,
      pages: 1000,
      loading: false,
    });
  };
  render() {
    const { data, pages, loading } = this.state;
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
              Header: 'Publisher Name',
              accessor: 'publisher',
              sortable: false,
            },
            {
              Header: 'Stars',
              accessor: 'stars',
            },
          ]}
          manual
          data={data}
          pages={pages}
          loading={loading}
          sortable
          onSortedChange={(newSorted, column, additive) => {
            this.onSortTable(newSorted, column, additive);
          }}
          onFetchData={this.fetchData}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  repos: state.repos,
  query: state.query,
});

const MapDispatchToProps = {
  getRepos: reposOperations.requestRepos,
  updateQuery: reposActions.updateQueryRequest,
};

export default connect(mapStateToProps, MapDispatchToProps)(Table);
