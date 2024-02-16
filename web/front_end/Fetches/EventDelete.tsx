import {eventFetch} from './EventFetch';

export const eventDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    const url = `${process.env.REACT_APP_BASE_URL}/delete_event/${id}`;
    await fetch(url, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_event', data);
        eventFetch();
      });
  } catch (err) {
    console.log(err);
  }
};
