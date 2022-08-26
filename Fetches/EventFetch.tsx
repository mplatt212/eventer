import store from '../Store/Store';

export const eventFetch = async () => {
  const options = {
    method: 'GET',
  };
  //For nodemon use http://192.168.1.15:3000
  try {
    await fetch('http://192.168.1.15:3000/events', options)
      .then(r => r.json())
      .then(data => {
        console.log('/events', data);
        store.setEvents(data);
      });
  } catch (err) {
    console.log(err);
  }
};
