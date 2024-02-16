import store from '../Store/Store';

export const eventFetch = async () => {
  const options = {
    method: 'GET',
  };

  try {
    const userID = store.authStore.userID;
    const url = `${process.env.REACT_APP_BASE_URL}/events/${userID}`;
      await fetch(url, options)
        .then(r => r.json())
        .then(data => {
          console.log('/events', data);
          store.setEvents(data);
        });
  } catch (err) {
    console.log(err);
  }
};
