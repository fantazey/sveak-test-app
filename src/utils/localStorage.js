const KEY = 'sveak-test-app';

export function loadFromStorage() {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(KEY));
  } catch (e) {
    localStorage.clear();
  }
  return data;
}

export function saveToStorage(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
