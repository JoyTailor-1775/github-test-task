import * as cachingProxy from '../../api/cachingProxy';

test('cachingProxyTest: deleteTheOldestRow()', () => {
  if (!!localStorage.key(0)) {
    const theOldestRow = localStorage.key(0);
    cachingProxy.deleteTheOldestRow();
    const newTheOldestRow = localStorage.key(0);
    expect(theOldestRow).not.toEqual(newTheOldestRow);
  }
});

test('cachingProxyTest: normalize()', () => {
  const testData = {
    total_count: 777,
    some_field: 'sdfsdf',
    another_field: 00003030303030303,
    items: [
      {
        name: 'My name',
        stargazers_count: 333,
        full_name: 'My full name',
        dsf: 'sdd',
        tyufk: 2222,
      },
      {
        name: 'My name',
        stargazers_count: 333,
        full_name: 'My full name',
        dsf: 'sdd',
        tyufk: 2222,
        hfhfhf: 'dshddhd',
      },
      {
        dsf: 'sdd',
        name: 'My name',
        stargazers_count: 333,
        full_name: 'My full name',
      },
      {
        name: 'My name',
        stargazers_count: 333,
        full_name: 'My full name',
        dsf22: 'sdd',
        tyufk: 2222,
        sdf: 'sd',
        for: ['sd', 2, 2, 2, 2, 2, 2],
      },
    ],
    array: [
      [22, 22],
      [22, [22222, [333], 333]],
    ],
  };

  const expectedData = {
    total_count: expect.toBeDefined(),
    items: {
      name: expect,
    },
  };

  const normalizedData = cachingProxy.normalize(testData);
  expect(normalizedData);
});
