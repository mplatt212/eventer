import store from '../Store/Store';

export const eventFetch = async () => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch('http://10.0.2.2:3000/events', options)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        store.setEvents(data);
      });
  } catch (err) {
    console.log(err);
  }
};
