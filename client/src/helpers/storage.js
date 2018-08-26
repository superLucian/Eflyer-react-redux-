const storage = window.sessionStorage;

const Storage = {
  isSupported() {
    const testKey = 'test';
    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  saveUser(user) {
    try {
      storage.setItem('user', JSON.stringify(user));
    } catch (error) {
      return null;
    }
  },
  loadUser() {
    try {
      return JSON.parse(storage.getItem('user'));
    } catch (error) {
      return null;
    }
  },
  deleteUser() {
    try {
      storage.removeItem('user');
    } catch (error) {
      return null;
    }
  },

  saveToken(token) {
    try {
      storage.setItem('token', token);
    } catch (error) {
      return null;
    }
  },
  loadToken() {
    try {
      return storage.getItem('token');
    } catch (error) {
      return null;
    }
  },
  deleteToken() {
    try {
      storage.removeItem('token');
    } catch (error) {
      return null;
    }
  },

  saveStep1Action(step1Action) {
    try {
      storage.setItem('step1Action', step1Action);
    } catch (error) {
      return null;
    }
  },
  loadStep1Action() {
    try {
      return storage.getItem('step1Action');
    } catch (error) {
      return null;
    }
  }
};

if (!Storage.isSupported()) {
  console.log('Your browser does not support sessionStorage. Don\'t worry. The app can work without it.');
}

export default Storage;
