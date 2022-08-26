import {eventFetch} from './EventFetch';

export const eventDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(`http://192.168.1.15:3000/delete_event/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_event', data);
        eventFetch();
      });
  } catch (err) {
    console.log(err);
  }
};
