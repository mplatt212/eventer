export const eventEdit = async (id: number) => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch(`http://192.168.1.15:3000/fetch_event/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/fetch_event', data);
      });
  } catch (err) {
    console.log(err);
  }
};
