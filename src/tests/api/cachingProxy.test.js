import * as cachingProxy from '../../api/cachingProxy';

test('cachingProxyTest: deleteTheOldestRow()', () => {
  if (!!localStorage.key(0)) {
    const theOldestRow = localStorage.key(0);
    cachingProxy.deleteTheOldestRow();
    const newTheOldestRow = localStorage.key(0);
    expect(theOldestRow).not.toEqual(newTheOldestRow);
  }
});

test('cachingProxyTest: getItem()', () => {
  const returnedData = {
    name: expect.any(String),
    full_name: expect.any(String),
    stargazers_count: expect.any(Number),
  };
  const data = cachingProxy.getItem();
  if (data) {
    expect(data).toHaveProperty('total_count');
    expect(data.total_count).any(Number);
    expect(data).toHaveProperty('items');
    expect(data.items).any(Array);
    if (data.items.length > 0) {
      expect(data.items).objectContaining(returnedData);
    }
  }
});
