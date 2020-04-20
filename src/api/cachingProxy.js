// Returns amount of available memory in the LocalStorage in bytes.
const getAvailableStorage = () => {
  return navigator.storage.estimate().then(function (estimate) {
    return estimate.quota;
  });
};

// Returns amount of used memory in the LocalStorage in bytes.
// For some reason, default function navigator.storage.estimate() does
// not work properly here, presumably because of insecure connection
// protocole (HTTP), hence I've used manual function to count , at least
// approximate amount of taken memory.
const getUsedStorage = () => {
  let allStrings = '';
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      allStrings += localStorage[key];
    }
  }
  return allStrings.length * 2;
};

// Deletes the oldest row in the LocalStorage
const deleteTheOldestRow = () => {
  localStorage.removeItem(localStorage.key(0));
};

// Normalizes incoming data for storing
const normalize = (data) => {
  const normalizedItems = data.items.map((el) => {
    return { name: el.name, full_name: el.full_name, stargazers_count: el.stargazers_count };
  });
  return {
    total_count: data.total_count,
    items: normalizedItems,
  };
};

// Finds requested key in the LocalStorage and returns it's value
export const getItem = (query) => {
  return JSON.parse(localStorage.getItem(query));
};

export const setItem = async (query, data) => {
  // Normalizes incoming data and preparing for stroing in JSON format.
  const normalizedData = normalize(data);
  const stringifiedData = JSON.stringify(normalizedData);
  // In UTF-8 encoding 1 string character takes 2 bytes of memory for storing.
  const dataSize = stringifiedData.length * 2;

  // Here it checks if browser at all have LocalStorage manamegent tools, if not
  // - proxy process exits. If browser do has all the neccessary tools - the oldest
  // rows in the LocalStorage are deleted, unless there is enough space to store the
  // incoming data.
  try {
    const remainingSize = (await getAvailableStorage()) - (await getUsedStorage());
    while (dataSize >= remainingSize) {
      deleteTheOldestRow();
    }
    localStorage.setItem(query, stringifiedData);
  } catch (error) {
    console.error('This browser does not support LocalStorage tools:', error);
  }
};
