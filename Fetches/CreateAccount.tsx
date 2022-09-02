import store from "../Store/Store";

interface IUser {
      fName: string,
      lName: string,
      email: string,
      username: string,
      pw: string,
}

export const createAccount = async (user: IUser) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  }

  store.authStore.setCreateUserLoading(true);
  try {
    await fetch(
      `http://192.168.1.15:3000/auth/create_account`,
      options
    )
      .then(r => r.json())
      .then(data => {
        console.log(data);
        store.authStore.setCreateUserLoading(false);
        store.authStore.setCreateAccountModalOpen(false);
        store.authStore.setInfoModalTitle('Account Created')
        store.authStore.setInfoModalMsg('Your account was created successfully!  Please login to proceed.')
        store.authStore.setInfoModalOpen(true);
      });
  } catch (error) {
    console.log(error);
    store.authStore.setCreateUserLoading(false);
    store.authStore.setCreateAccountModalOpen(false);
    store.authStore.setInfoModalTitle('Account Creation Failed')
    store.authStore.setInfoModalMsg('Your account was unable to be created.  Please try again.')
    store.authStore.setInfoModalOpen(true);
  }
};
