export const eventEdit = async (id: number) => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch(`http://10.0.2.2:3000/fetch_event/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/fetch_event', data);
      });
  } catch (err) {
    console.log(err);
  }
};
