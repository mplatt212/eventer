import {eventFetch} from './EventFetch';

export const eventDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(`http://10.0.2.2:3000/delete_event/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_event', data);
        eventFetch();
      });
  } catch (err) {
    console.log(err);
  }
};
