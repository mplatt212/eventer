import store from "../Store/Store";

export const login = async (username: string, pw: string) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "username": `${username}`,
      "pw": `${pw}`
    }),
  }

  store.authStore.setCreateUserLoading(true);
  try {
    await fetch(
      `http://192.168.1.15:3000/auth/login`,
      options
    )
      .then(r => r.json())
      .then(data => {
        console.log(data);
        store.authStore.setCreateUserLoading(false);
      });
  } catch (error) {
    console.log(error);
    store.authStore.setCreateUserLoading(false);
  }
};
