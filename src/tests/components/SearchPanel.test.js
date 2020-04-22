import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { SearchPanel } from '../../components/SearchPanel/SearchPanel';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    getRepos: jest.fn(),
    updateQuery: jest.fn(),
  };

  const mockStore = configureStore();
  const initialStore = {
    gitHub: {
      repos: [],
      query: {
        name: '',
        page: 0,
        order: null,
      },
    },
  };
  const store = mockStore(initialStore);

  const enzymeWrapper = shallow(<SearchPanel {...props} store={store} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('<SearchPanel />', () => {
  test('calling the components methods', async () => {
    const { enzymeWrapper, props } = setup();
    const instance = enzymeWrapper.instance();
    expect(instance.state.searchReq).toBe('');

    enzymeWrapper
      .find('input.search-panel__input')
      .simulate('change', { target: { name: 'searchReq', value: 'abc' } });
    expect(enzymeWrapper.find('input.search-panel__input').props().value).toEqual('abc');
    expect(instance.state.searchReq).toBe('abc');

    enzymeWrapper.find('button.controls__button.controls__button--cancel').simulate('click');
    expect(instance.state.searchReq).toBe('');
  });
});
