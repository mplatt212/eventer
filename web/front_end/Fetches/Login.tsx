import store from '../Store/Store';

export const login = async (username: string, pw: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      pw: `${pw}`,
    }),
  };
console.log('LOGIN BUTTON', options)
  store.authStore.setCreateUserLoading(true);
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/auth/login`;
    await fetch(url, options)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        if (data.login === true) {
          store.authStore.setLoggedIn(true);
          store.authStore.setLoginErrorMsg('');
          store.authStore.setUserID(data.id);
          store.authStore.setFirstName(data.first_name);
          store.authStore.setLastName(data.last_name);
          store.authStore.setEmail(data.email);
        } else {
          store.authStore.setLoginErrorMsg(data.message);
        }
        store.authStore.setCreateUserLoading(false);
      });
  } catch (error) {
    console.log(error);
    store.authStore.setCreateUserLoading(false);
  }
};
