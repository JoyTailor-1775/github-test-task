import React from 'react';
import Table from '../components/Table/';
import SearchPanel from '../components/SearchPanel';

import './page.scss';

const ReposSearchPage = () => {
  return (
    <main className="page-content">
      <SearchPanel />
      <Table />
    </main>
  );
};

export default ReposSearchPage;
